import Iconify from "@components/iconify/iconify";
import { Button } from "@mui/material";
import { useState } from "react";
import { ReactSpreadsheetImport } from "react-spreadsheet-import";

const BeneficiariesSpreedsheetImport = () => {
    const [isOpen, setIsOpen] = useState(false);

    const fields = [
        {
          label: "Name",
          key: "name",
          fieldType: {
            type: "input",
          },
          validations: [
            {
              rule: "required",
              errorMessage: "Name is required",
              level: "error",
            },
          ],
        },
        {
          label: "Wallet Address",
          key: "walletAddress",
          fieldType: {
            type: "input",
          },
          validations: [
            {
              rule: "required",
              errorMessage: "Wallet Address is required",
              level: "error",
            },
          ],
        },
        {
          label: "Phone Ownership",
          key: "phoneOwnership",
          fieldType: {
            type: "input",
          },
          validations: [
            {
              rule: "required",
              errorMessage: "Phone Ownership is required",
              level: "error",
            },
          ],
        },
        {
          label: "Bank Status",
          key: "bankStatus",
          fieldType: {
            type: "input",
          },
          validations: [
            {
              rule: "required",
              errorMessage: "Bank Status is required",
              level: "error",
            },
          ],
        },
      ] as const;

    const onSubmit=(data:any, file:any)=>{
        console.log({data,file})
    }
    
    return (
        <>
            <Button
                variant="outlined"
                startIcon={<Iconify icon="mingcute:add-line" />}
                color="success"
                onClick={() => setIsOpen(true)}
            >
                Upload File
            </Button>
            <ReactSpreadsheetImport isOpen={isOpen} fields={fields} onClose={() => setIsOpen(false)} onSubmit={onSubmit}/>

        </>
    )
}

export default BeneficiariesSpreedsheetImport