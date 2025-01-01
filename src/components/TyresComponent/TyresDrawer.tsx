import React, { useEffect } from "react";
import { Drawer } from "vaul";
import { Expand, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import FormComponentV2, { CustomField } from "@/components/FormComponentV2";
import { TyresMaster } from "@/pages/Tyres/Tyres.d";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { queryClient } from "@/hooks/queryClient";

interface TyresDrawerProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  isEdit: boolean;
  setIsEdit: (isEdit: boolean) => void;
  CurrentTyres: TyresMaster | null;
  handleCreateTyres: (data: TyresMaster) => void;
  handleUpdateTyres: (data: TyresMaster) => void;
  formField: CustomField[];
  SelectedTruck: TruckMaster | undefined;
}

const TyresDrawer: React.FC<TyresDrawerProps> = ({
  open,
  setOpen,
  isEdit,
  setIsEdit,
  CurrentTyres,
  handleCreateTyres,
  handleUpdateTyres,
  formField,
  SelectedTruck,
}) => {
  const navigate = useNavigate();

  const createSchemaObject = (fields: CustomField[]) =>
    Object.fromEntries(
      fields.map((field) => [
        field.name,
        field.validation?.pattern ?? z.string(),
      ]),
    );

  const setDefaultValues = (field: CustomField) => {
    switch (field.type) {
      case "text":
      case "email":
      case "number":
      case "password":
      case "textarea":
        return field?.isInputProps?.defaultValue ?? "";
      case "checkbox":
        return field?.isInputProps?.defaultChecked ?? false;
      case "select":
        return field?.isInputProps?.defaultSelected ?? "";
      case "radio":
        return field?.isInputProps?.defaultSelected ?? "";
      case "date":
        return field?.isInputProps?.defaultValue ?? "";
      default:
        return "";
    }
  };

  const formMethods = useForm({
    resolver: zodResolver(z.object(createSchemaObject(formField)).required()),
    defaultValues: Object.fromEntries(
      formField.map((field) => [field.name, setDefaultValues(field)]),
    ),
    values: CurrentTyres as FieldValues,
  });

  useEffect(() => {
    if (!isEdit && open) {
      console.log("SelectedTruck", SelectedTruck);
      formMethods.setValue("Wheeler_Type", SelectedTruck?.wheels);
    }
  }, [SelectedTruck, SelectedTruck?.Manufacturer, formMethods, isEdit, open]);

  return (
    <Drawer.Root
      direction="right"
      open={open}
      onOpenChange={setOpen}
      dismissible={false}
    >
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40" />
        <Drawer.Content
          className="right-2 top-2 bottom-2 fixed z-10 outline-none flex lg:w-96 md:w-80 w-72"
          style={
            { "--initial-transform": "calc(100% + 8px)" } as React.CSSProperties
          }
        >
          <div className="bg-zinc-50 h-full w-full grow p-5 flex flex-col justify-between items-center rounded-[16px] overflow-y-auto">
            <div className="w-full">
              <div className="flex justify-between">
                <Expand
                  className=" w-5 cursor-pointer"
                  onClick={() => {
                    navigate({
                      pathname: `/tyres/1`,
                    });
                  }}
                />
                <X
                  className=" cursor-pointer"
                  onClick={() => {
                    setOpen(false);
                    setIsEdit(false);
                  }}
                />
              </div>
              <Drawer.Title className="font-semibold text-xl mb-8 text-zinc-900 text-center">
                {isEdit ? "Edit" : "Add"} Tyres Details
              </Drawer.Title>
              <Drawer.Description className="text-zinc-600 mb-2">
                <FormComponentV2
                  fields={formField}
                  onSubmit={
                    isEdit
                      ? (handleUpdateTyres as SubmitHandler<FieldValues>)
                      : (handleCreateTyres as SubmitHandler<FieldValues>)
                  }
                  isUpdate={isEdit}
                  formMethods={formMethods}
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
