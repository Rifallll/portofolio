import React from "react";

interface SectionHeaderProps {
  title: string;
  description: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title, description }) => {
  return (
    <div className="text-center mb-12">
      <h2 className="text-4xl font-heading text-primary mb-4">{title}</h2>
      <p className="text-lg text-muted-foreground font-body">{description}</p>
    </div>
  );
};

export default SectionHeader;