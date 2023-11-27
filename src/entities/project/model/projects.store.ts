import { makeAutoObservable } from 'mobx';
import { makePersistable } from 'mobx-persist-store';
import {
    apiClient,
    createImmediateReaction,
    deserializeState,
    DTOProject,
    DTOProjectCapabilities,
    getWindow,
    Loadable,
    replaceIfNotEqual,
    serializeState,
    toColor
} from 'src/shared';
import { CreateProjectFormValues, Project, UpdateProjectFormValues } from './interfaces';
import { tGUserStore } from '../../tg-user';

class ProjectsStore {
    projects$ = new Loadable<Project[]>([]);

    private selectedProjectId: number | null = null;

    get selectedProject(): Project | null {
        if (this.selectedProjectId == null) {
            return null;
        }

        return (
            this.projects$.value.find(project => project.id === this.selectedProjectId) ||
            this.projects$.value[0] ||
            null
        );
    }

    constructor() {
        makeAutoObservable(this);

        makePersistable(this, {
            name: 'SelectedProject',
            properties: [
                {
                    key: 'selectedProjectId',
                    serialize: serializeState,
                    deserialize: deserializeState
                } as unknown as keyof this
            ],
            storage: getWindow()!.localStorage
        }).then(() => {
            createImmediateReaction(
                () => tGUserStore.user$.value,
                async user => {
                    if (user) {
                        await this.fetchProjects();

                        if (this.selectedProjectId == null && this.projects$.value.length) {
                            this.selectProject(this.projects$.value[0].id);
                        }
                    } else {
                        this.clearState();
                    }
                }
            );
        });
    }

    fetchProjects = this.projects$.createAsyncAction(async () => {
        const response = await apiClient.api.getProjects();

        response.data.items.map(mapProjectDtoToProject).forEach(project => {
            const existingProject = this.projects$.value.find(item => item.id === project.id);
            if (existingProject) {
                replaceIfNotEqual(existingProject, 'name', project.name);
                replaceIfNotEqual(existingProject, 'imgUrl', project.imgUrl);
                replaceIfNotEqual(
                    existingProject,
                    'fallbackBackground',
                    project.fallbackBackground
                );
                replaceIfNotEqual(
                    existingProject,
                    'creationDate',
                    project.creationDate,
                    (a, b) => a.getTime() === b.getTime()
                );
            } else {
                this.projects$.value.push(project);
            }
        });
    });

    selectProject = (id: number): void => {
        this.selectedProjectId = id;
    };

    private clearState = (): void => {
        this.projects$.clear();
        this.selectedProjectId = null;
    };

    createProject = this.projects$.createAsyncAction(
        async (form: CreateProjectFormValues) => {
            const request: Parameters<typeof apiClient.api.createProject>[0] = {
                name: form.name
            };

            if (form.icon) {
                request.image = form.icon;
            }

            const response = await apiClient.api.createProject(request);

            const project = mapProjectDtoToProject(response.data.project);
            this.projects$.value = this.projects$.value.concat(project);
            this.selectedProjectId = project.id;
        },
        {
            successToast: {
                title: 'Project created successfully'
            },
            errorToast: {
                title: "Project wasn't created"
            }
        }
    );

    updateProject = this.projects$.createAsyncAction(
        async (form: UpdateProjectFormValues): Promise<void> => {
            const request: Parameters<typeof apiClient.api.updateProject>[1] = {};

            if ('icon' in form) {
                if (form.icon) {
                    request.image = form.icon || null;
                } else {
                    request.remove_image = true;
                }
            }

            if ('name' in form) {
                request.name = form.name;
            }

            const response = await apiClient.api.updateProject(form.projectId, request);
            const project = mapProjectDtoToProject(response.data.project);

            const projectIndex = this.projects$.value.findIndex(item => item.id === project.id);
            if (projectIndex !== -1) {
                this.projects$.value[projectIndex] = project;
            } else {
                this.projects$.value.push(project);
            }
        },
        {
            successToast: {
                title: 'Project updated successfully'
            },
            errorToast: {
                title: "Project wasn't updated"
            }
        }
    );

    deleteProject = this.projects$.createAsyncAction(
        async (projectId: number) => {
            await apiClient.api.deleteProject(projectId);

            return this.projects$.value.filter(item => item.id !== projectId);
        },
        {
            successToast: {
                title: 'Project deleted successfully'
            },
            errorToast: {
                title: "Project wasn't deleted"
            }
        }
    );
}

function mapProjectDtoToProject(projectDTO: DTOProject): Project {
    return {
        id: projectDTO.id,
        name: projectDTO.name,
        imgUrl: projectDTO.avatar,
        creationDate: new Date(projectDTO.date_create),
        fallbackBackground: gradient(toColor(Math.abs(projectDTO.id ^ 255), { min: 30, max: 215 })),
        capabilities: {
            invoices: projectDTO.capabilities.includes(DTOProjectCapabilities.DTOInvoices),
            stats: {
                query: projectDTO.capabilities.includes(DTOProjectCapabilities.DTOStats)
            }
        }
    };
}

function gradient(color: string): string {
    return `linear-gradient(27.61deg, ${color} -4.58%, ${color}60 107.4%)`;
}

export const projectsStore = new ProjectsStore();
