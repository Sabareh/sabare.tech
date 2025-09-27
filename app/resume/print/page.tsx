"use client"

import { useEffect } from "react"

type ResumeExperience = {
  title: string
  company: string
  location: string
  period: string
  achievements: string[]
  technologies: string[]
}

type ResumeEducation = {
  degree: string
  school: string
  location: string
  period: string
  details?: string
}

type ResumeSkillMap = Record<string, string[]>

type ResumePublication = {
  title: string
  description?: string
}

type ResumeLanguage = {
  name: string
  proficiency: string
}

const resumeData = {
  personalInfo: {
    name: "Victor Sabare",
    title: "Data Engineer @ Stanbic Bank Kenya",
    email: "sabarevictor@gmail.com",
    phone: "+254 113193473",
    location: "Ngong Road, Nairobi County, Kenya",
    website: "https://sabare.tech",
    linkedin: "https://www.linkedin.com/in/victorsabare",
    github: "https://github.com/Sabareh",
    blog: "https://sabare.me",
  },
  summary:
    "Data engineer modernizing legacy banking workloads into reliable Python + Airflow pipelines. I deliver repeatable ingestion patterns, validation-first data contracts, and observability so Finance, Risk, and Ops teams can trust their dashboards and services.",
  topSkills: ["Data Architecture", "Data Loading", "Amazon Elastic MapReduce (EMR)"],
  experience: [
    {
      title: "Data Engineer",
      company: "Stanbic Bank Kenya",
      location: "Nairobi County, Kenya",
      period: "June 2025 - Present",
      achievements: [
        "Re-platform legacy Oracle/EDW workloads into Python + Airflow DAGs for simpler, auditable orchestration.",
        "Hardened GL integrity and interest change pipelines with validation checkpoints and automated alerting.",
        "Established reusable query → read_sql → to_sql patterns accelerating new data product onboarding.",
        "Shipped Excel runbooks, Power BI dashboards, and metrics that give stakeholders real-time visibility.",
      ],
      technologies: ["Python", "Apache Airflow", "Polars", "Pandas", "Oracle", "SQL", "Delta Lake", "Kafka", "dbt"],
    },
    {
      title: "Data Engineer",
      company: "HFC Kenya",
      location: "Nairobi County, Kenya",
      period: "July 2024 - September 2024",
      achievements: [
        "Digitized manual banking processes with production Power Apps and Power Automate flows.",
        "Partnered on AWS Redshift migration, designing data loading standards and dimensional models.",
        "Streamlined Central Bank regulatory submissions with SOAPUI automation and QA guardrails.",
      ],
      technologies: ["Power Apps", "Power Automate", "AWS", "Amazon Redshift", "SQL", "SOAPUI"],
    },
    {
      title: "Freelance Data Analytics Engineer",
      company: "Upwork",
      location: "Remote",
      period: "March 2023 - July 2024",
      achievements: [
        "Wrote 150+ long-form landing page sections covering remote hiring interviews and FAQs.",
        "Increased employer blog traffic by 16% with data-driven tutorials and thought leadership.",
        "Consulted on portfolio deployment, analytics instrumentation, and Power BI rollouts for distributed teams.",
      ],
      technologies: ["Technical Writing", "SEO", "Analytics Strategy", "Power BI", "Content Operations"],
    },
  ] as ResumeExperience[],
  education: [
    {
      degree: "Associate Big Data Engineer (ABDE™)",
      school: "Data Science Council of America",
      location: "Remote",
      period: "2025",
      details: "Certification in enterprise-scale data engineering patterns.",
    },
    {
      degree: "Bachelor of Science in Data Science and Analytics",
      school: "Jomo Kenyatta University of Agriculture and Technology",
      location: "Kenya",
      period: "2020 - 2024",
      details: "Machine Learning I & II, Probability & Statistics, Data Mining.",
    },
    {
      degree: "Data Science and Analytics Track",
      school: "DataCamp",
      location: "Remote",
      period: "2021 - 2023",
      details: "Associate-level programs in data engineering and analytics.",
    },
  ] as ResumeEducation[],
  skills: {
    "Data Engineering": ["Python", "Polars", "Pandas", "Apache Airflow", "dbt", "Kafka", "Delta Lake", "Spark"],
    "Cloud & Platforms": ["Amazon EMR", "AWS Redshift", "Microsoft Fabric", "Azure", "Oracle Data Warehouse"],
    "Data Reliability": ["Data Contracts", "SLA Design", "Data Quality Monitoring", "Observability", "Backfill Playbooks"],
    "Analytics & Power Platform": ["Power BI", "Power Apps", "Power Automate", "PowerFX", "DAX"],
    "Collaboration": ["Stakeholder Runbooks", "Technical Writing", "Cross-functional Workshops", "Mentorship"],
  } as ResumeSkillMap,
  languages: [
    { name: "English", proficiency: "Full Professional" },
    { name: "Swahili", proficiency: "Limited Working" },
  ] as ResumeLanguage[],
  certifications: [
    "Associate Big Data Engineer (ABDE™)",
    "BCG - Data Science Job Simulation",
    "Spatial Data Science: The New Frontier in Analytics (MOOC)",
    "Data Engineer Associate",
    "Data Analyst Associate",
  ],
  honors: ["World Scholars Award", "Microsoft Learn Student Ambassador"],
  publications: [
    {
      title: "Data Engineering Technologies",
      description: "Guide to orchestrating data tooling for regulated industries.",
    },
    {
      title: "Building and Optimizing Data Pipelines for High-Volume Data Processing",
      description: "Operational playbooks for validation-first ingestion at scale.",
    },
    {
      title: "Creating a Data Pipeline Using Apache Airflow",
      description: "Hands-on workflow automation walkthrough with production guardrails.",
    },
    {
      title: "Stock Price Prediction with Apache Spark and Apache Cassandra",
      description: "Streaming architecture exploration for market intelligence.",
    },
  ] as ResumePublication[],
  projects: [
    {
      name: "GL Integrity Modernization",
      description: "Airflow pipelines with automated validation, rollback, and Power BI observability for finance stakeholders.",
      technologies: ["Python", "Apache Airflow", "Oracle", "Delta Lake", "Power BI"],
    },
    {
      name: "Regulatory Reporting Automation",
      description: "SOAPUI + Power Platform tooling cutting regulatory report prep time by 60%.",
      technologies: ["Power Apps", "SOAPUI", "AWS Redshift", "SQL"],
    },
  ],
}

type ResumeData = typeof resumeData

type SkillEntry = [string, string[]]

type ExperienceEntry = ResumeData["experience"][number]

type ProjectEntry = ResumeData["projects"][number]

type PublicationEntry = ResumePublication

type LanguageEntry = ResumeLanguage

type HonorEntry = string

type CertificationEntry = string

type EducationEntry = ResumeEducation

type TopSkillEntry = string

export default function ResumePrintPage() {
  useEffect(() => {
    document.title = `${resumeData.personalInfo.name} - Resume`
  }, [])

  return (
    <div className="print-resume">
      <style jsx global>{`
        @media print {
          body {
            margin: 0;
            padding: 0;
            font-size: 12px;
            line-height: 1.4;
            color: #000;
            background: white;
          }

          .print-resume {
            max-width: none;
            margin: 0;
            padding: 0.5in;
            background: white;
          }

          .section-title {
            font-size: 16px;
            margin-bottom: 8px;
            margin-top: 16px;
            border-bottom: 1px solid #ccc;
            padding-bottom: 2px;
            font-weight: 600;
          }

          .contact-info {
            text-align: center;
            margin-bottom: 16px;
          }

          .contact-row {
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
            gap: 12px;
            font-size: 11px;
            color: #555;
          }

          .experience-item {
            margin-bottom: 16px;
            break-inside: avoid;
          }

          .experience-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 4px;
          }

          .experience-achievements {
            margin: 6px 0 8px 16px;
            padding: 0;
          }

          .tech-badge {
            display: inline-block;
            background: #f5f6f8;
            padding: 2px 6px;
            margin: 2px 4px 2px 0;
            border-radius: 3px;
            font-size: 10px;
            border: 1px solid #e0e3e7;
          }

          .two-col {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 12px;
          }

          .list-inline {
            display: flex;
            flex-wrap: wrap;
            gap: 6px;
          }

          .badge-inline {
            display: inline-block;
            background: #e8f0fe;
            color: #1d4ed8;
            padding: 2px 6px;
            border-radius: 3px;
            font-size: 10px;
            border: 1px solid #d1d9ff;
          }
        }

        @media screen {
          .print-resume {
            max-width: 8.5in;
            margin: 1rem auto;
            padding: 1in;
            background: white;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          }

          .section-title {
            font-size: 18px;
            margin-bottom: 10px;
            margin-top: 20px;
            border-bottom: 1px solid #e2e8f0;
            padding-bottom: 4px;
            font-weight: 600;
          }

          .contact-info {
            text-align: center;
            margin-bottom: 20px;
          }

          .contact-row {
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
            gap: 14px;
            font-size: 12px;
            color: #555;
          }

          .experience-item {
            margin-bottom: 18px;
          }

          .experience-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 6px;
          }

          .tech-badge {
            display: inline-block;
            background: #f5f6f8;
            padding: 2px 6px;
            margin: 2px 4px 2px 0;
            border-radius: 3px;
            font-size: 10px;
            border: 1px solid #e0e3e7;
          }

          .two-col {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 16px;
          }

          .list-inline {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
          }

          .badge-inline {
            display: inline-block;
            background: #e8f0fe;
            color: #1d4ed8;
            padding: 3px 7px;
            border-radius: 4px;
            font-size: 10px;
            border: 1px solid #d1d9ff;
          }
        }
      `}</style>

      <div className="resume-content">
        <div className="contact-info">
          <h1 style={{ fontSize: "28px", marginBottom: "6px" }}>{resumeData.personalInfo.name}</h1>
          <h2 style={{ color: "#2563eb", fontSize: "18px", marginBottom: "12px" }}>{resumeData.personalInfo.title}</h2>
          <div className="contact-row">
            <span>📧 {resumeData.personalInfo.email}</span>
            <span>📞 {resumeData.personalInfo.phone}</span>
            <span>📍 {resumeData.personalInfo.location}</span>
            <span>🌐 {resumeData.personalInfo.website}</span>
          </div>
          <div className="contact-row" style={{ marginTop: "6px" }}>
            <span>💼 {resumeData.personalInfo.linkedin}</span>
            <span>💻 {resumeData.personalInfo.github}</span>
            <span>📝 {resumeData.personalInfo.blog}</span>
          </div>
        </div>

        <div>
          <h3 className="section-title">Professional Summary</h3>
          <p style={{ fontSize: "11px", lineHeight: "1.5", color: "#333" }}>{resumeData.summary}</p>
        </div>

        {resumeData.topSkills?.length ? (
          <div>
            <h3 className="section-title">Top Skills</h3>
            <div className="list-inline">
              {resumeData.topSkills.map((skill: TopSkillEntry) => (
                <span key={skill} className="badge-inline">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ) : null}

        <div>
          <h3 className="section-title">Professional Experience</h3>
          {resumeData.experience.map((exp: ExperienceEntry, index: number) => (
            <div key={`${exp.company}-${index}`} className="experience-item">
              <div className="experience-header">
                <div>
                  <div style={{ fontWeight: 600 }}>{exp.title}</div>
                  <div style={{ color: "#2563eb", fontSize: "12px", fontWeight: 500 }}>{exp.company}</div>
                </div>
                <div style={{ textAlign: "right", fontSize: "11px", color: "#666" }}>
                  <div>{exp.period}</div>
                  <div>{exp.location}</div>
                </div>
              </div>
              <ul className="experience-achievements" style={{ fontSize: "11px", color: "#444" }}>
                {exp.achievements.map((achievement, idx) => (
                  <li key={`${exp.company}-achievement-${idx}`}>{achievement}</li>
                ))}
              </ul>
              <div>
                {exp.technologies.map((tech) => (
                  <span key={`${exp.company}-tech-${tech}`} className="tech-badge">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div>
          <h3 className="section-title">Education</h3>
          {resumeData.education.map((edu: EducationEntry, index: number) => (
            <div key={`${edu.school}-${index}`} style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
              <div>
                <div style={{ fontWeight: 600 }}>{edu.degree}</div>
                <div style={{ color: "#2563eb", fontSize: "12px" }}>{edu.school}</div>
                {edu.details && <div style={{ fontSize: "11px", color: "#555" }}>{edu.details}</div>}
              </div>
              <div style={{ textAlign: "right", fontSize: "11px", color: "#666" }}>
                <div>{edu.period}</div>
                <div>{edu.location}</div>
              </div>
            </div>
          ))}
        </div>

        <div>
          <h3 className="section-title">Technical Skills</h3>
          <div className="two-col">
            {(Object.entries(resumeData.skills) as SkillEntry[]).map(([category, skills]) => (
              <div key={category}>
                <div style={{ fontWeight: 600, fontSize: "12px", marginBottom: "4px" }}>{category}</div>
                <div>
                  {skills.map((skill) => (
                    <span key={`${category}-${skill}`} className="tech-badge">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="section-title">Languages</h3>
          <div className="list-inline">
            {resumeData.languages.map((language: LanguageEntry) => (
              <span key={language.name} className="badge-inline">
                {language.name} • {language.proficiency}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h3 className="section-title">Certifications</h3>
          <div className="two-col">
            {resumeData.certifications.map((cert: CertificationEntry, index: number) => (
              <div key={`${cert}-${index}`} style={{ fontSize: "11px", color: "#444" }}>
                • {cert}
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="section-title">Honors & Awards</h3>
          <ul style={{ fontSize: "11px", color: "#444", margin: "0 0 0 16px" }}>
            {resumeData.honors.map((honor: HonorEntry, index: number) => (
              <li key={`${honor}-${index}`}>{honor}</li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="section-title">Publications</h3>
          {resumeData.publications.map((publication: PublicationEntry, index: number) => (
            <div key={`${publication.title}-${index}`} style={{ marginBottom: "8px" }}>
              <div style={{ fontWeight: 600, fontSize: "12px" }}>{publication.title}</div>
              {publication.description ? (
                <div style={{ fontSize: "11px", color: "#555" }}>{publication.description}</div>
              ) : null}
            </div>
          ))}
        </div>

        <div>
          <h3 className="section-title">Key Projects</h3>
          {resumeData.projects.map((project: ProjectEntry, index: number) => (
            <div key={`${project.name}-${index}`} style={{ marginBottom: "10px" }}>
              <div style={{ fontWeight: 600, fontSize: "12px" }}>{project.name}</div>
              <div style={{ fontSize: "11px", color: "#555", marginBottom: "4px" }}>{project.description}</div>
              <div>
                {project.technologies.map((tech) => (
                  <span key={`${project.name}-tech-${tech}`} className="tech-badge">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
