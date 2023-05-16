import { FunctionComponent } from 'react';
import { observer } from 'mobx-react-lite';
import { H4, Overlay, Span } from 'src/shared';
import { CreateInvoiceModal, InvoicesProjectInfo } from 'src/features';
import { Button, Flex, useDisclosure } from '@chakra-ui/react';

const ManageInvoicesPage: FunctionComponent = () => {
    const { isOpen, onClose, onOpen } = useDisclosure();
    return (
        <Overlay>
            <H4 mb="1">Invoices</H4>
            <InvoicesProjectInfo mb="5" />
            <Flex justify="space-between">
                <Span>search</Span>
                <Button onClick={onOpen} size="lg" variant="primary">
                    New Invoice
                </Button>
            </Flex>
            <CreateInvoiceModal isOpen={isOpen} onClose={onClose} />
        </Overlay>
    );
};

export default observer(ManageInvoicesPage);
