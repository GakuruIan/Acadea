import FileUpload from "@/components/ui/FileUpload/FileUpload";
import React from "react";

interface props {
  form: any;
}

const DocumentUpload = ({ form }: props) => {
  return (
    <div>
      <FileUpload
        form={form}
        name="cv"
        label="Upload your CV/Resume"
        placeholder="choose your cv"
        accept=".pdf,.doc,.docx"
      />

      <FileUpload
        form={form}
        name="certifications"
        label="Upload your teaching certifications"
        placeholder="choose your certifications"
        multiple={true}
        accept=".pdf,.doc,.docx"
      />
    </div>
  );
};

export default DocumentUpload;
