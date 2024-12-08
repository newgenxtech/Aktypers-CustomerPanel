import React from 'react';
import { Drawer } from 'vaul';
import { Expand, X } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import FormComponentV2, { CustomField } from '@/components/FormComponentV2';
import { TyresMaster } from '@/pages/Tyres/Tyres.d';

interface TyresDrawerProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    isEdit: boolean;
    setIsEdit: (isEdit: boolean) => void;
    CurrentTyres: TyresMaster | null;
    handleCreateTyres: (data: TyresMaster) => void;
    handleUpdateTyres: (data: TyresMaster) => void;
    formField: CustomField[];
}

const TyresDrawer: React.FC<TyresDrawerProps> = ({
    open,
    setOpen,
    isEdit,
    setIsEdit,
    CurrentTyres,
    handleCreateTyres,
    handleUpdateTyres,
    formField
}) => {
    const navigate = useNavigate();

    return (
        <Drawer.Root direction="right" open={open} onOpenChange={setOpen} dismissible={false}>
            <Drawer.Portal>
                <Drawer.Overlay className="fixed inset-0 bg-black/40" />
                <Drawer.Content
                    className="right-2 top-2 bottom-2 fixed z-10 outline-none flex lg:w-96 md:w-80 w-72"
                    style={{ '--initial-transform': 'calc(100% + 8px)' } as React.CSSProperties}
                >
                    <div className="bg-zinc-50 h-full w-full grow p-5 flex flex-col justify-between items-center rounded-[16px] overflow-y-auto">
                        <div className="w-full">
                            <div className="flex justify-between">
                                <Expand className=' w-5 cursor-pointer' onClick={() => {
                                    navigate({
                                        pathname: `/tyres/1`
                                    });
                                }} />
                                <X className=' cursor-pointer' onClick={() => {
                                    setOpen(false)
                                    setIsEdit(false);
                                }} />
                            </div>
                            <Drawer.Title className="font-semibold text-xl mb-8 text-zinc-900 text-center">
                                {isEdit ? 'Edit' : 'Add'} Tyres Details
                            </Drawer.Title>
                            <Drawer.Description className="text-zinc-600 mb-2">
                                <FormComponentV2
                                    fields={formField}
                                    isUpdate={isEdit}
                                    onSubmit={(data) => {
                                        if (isEdit) {
                                            handleUpdateTyres(data as TyresMaster);
                                        } else {
                                            handleCreateTyres(data as TyresMaster);
                                        }
                                    }}
                                    initialValues={CurrentTyres}
                                />
                            </Drawer.Description>
                        </div>
                    </div>
                </Drawer.Content>
            </Drawer.Portal>
        </Drawer.Root>
    );
};

export default TyresDrawer;