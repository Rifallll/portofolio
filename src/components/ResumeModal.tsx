import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

interface ResumeModalProps {
  children: React.ReactNode;
}

const ResumeModal: React.FC<ResumeModalProps> = ({ children }) => {
  const cvPath = "https://drive.google.com/file/d/1YysZCMvXb4kFLG9UkDN93tCk6hbyCbxs/view?usp=sharing";

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-xl h-[80vh] p-0 flex flex-col bg-card border border-border text-foreground">
        <DialogHeader className="p-6 pb-2">
          <DialogTitle className="text-2xl font-bold text-primary">My Resume / CV</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Here you can view my full resume. You can also download it below.
          </DialogDescription>
        </DialogHeader>
        <div className="flex-grow w-full p-6 pt-0">
          <iframe
            src="https://drive.google.com/file/d/1YysZCMvXb4kFLG9UkDN93tCk6hbyCbxs/preview"
            width="100%"
            height="100%"
            className="border-none rounded-md bg-secondary"
            title="Rifal Azhar Permana CV"
          >
            This browser does not support PDFs. Please download the CV to view it.
          </iframe>
        </div>
        <div className="p-6 pt-0 flex justify-end">
          <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90 flex items-center space-x-2">
            <a href={cvPath} target="_blank" rel="noopener noreferrer" download>
              <Download className="h-4 w-4" />
              <span>Download CV</span>
            </a>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ResumeModal;