import React from 'react';

interface PersonSchemaProps {
    name?: string;
    jobTitle?: string;
    url?: string;
    email?: string;
    telephone?: string;
    address?: {
        locality: string;
        country: string;
    };
    sameAs?: string[];
}

export const PersonSchema: React.FC<PersonSchemaProps> = ({
    name = "Rifal Azhar Permana",
    jobTitle = "Creative Developer & Data Analyst",
    url = "https://rifalazhar.com",
    email = "rifalazharpermana@gmail.com",
    telephone = "+62-852-1742-1701",
    address = { locality: "Pandeglang", country: "ID" },
    sameAs = []
}) => {
    const schema = {
        "@context": "https://schema.org",
        "@type": "Person",
        "name": name,
        "jobTitle": jobTitle,
        "url": url,
        "email": email,
        "telephone": telephone,
        "address": {
            "@type": "PostalAddress",
            "addressLocality": address.locality,
            "addressCountry": address.country
        },
        ...(sameAs.length > 0 && { "sameAs": sameAs })
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
};

export const WebSiteSchema: React.FC = () => {
    const schema = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "Rifal Azhar Portfolio",
        "url": "https://rifalazhar.com",
        "description": "Portfolio of Rifal Azhar Permana. A Creative Technologist blending Data Science with High-End Web Development.",
        "author": {
            "@type": "Person",
            "name": "Rifal Azhar Permana"
        },
        "potentialAction": {
            "@type": "SearchAction",
            "target": "https://rifalazhar.com/projects?q={search_term_string}",
            "query-input": "required name=search_term_string"
        }
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
};

interface ProjectSchemaProps {
    name: string;
    description: string;
    url: string;
    image?: string;
    dateCreated?: string;
    author?: string;
}

export const ProjectSchema: React.FC<ProjectSchemaProps> = ({
    name,
    description,
    url,
    image,
    dateCreated,
    author = "Rifal Azhar Permana"
}) => {
    const schema = {
        "@context": "https://schema.org",
        "@type": "CreativeWork",
        "name": name,
        "description": description,
        "url": url,
        ...(image && { "image": image }),
        ...(dateCreated && { "dateCreated": dateCreated }),
        "author": {
            "@type": "Person",
            "name": author
        }
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
};

export default { PersonSchema, WebSiteSchema, ProjectSchema };
