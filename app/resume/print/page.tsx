"use client"

import { useEffect } from "react"

// Same resume data as the main resume page
const resumeData = {
  personalInfo: {
    name: "Your Name",
    title: "Senior Data Engineer",
    email: "your.email@example.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    website: "https://yourwebsite.com",
    linkedin: "https://linkedin.com/in/yourusername",
    github: "https://github.com/yourusername",
  },
  summary:
    "Experienced Data Engineer with 5+ years of expertise in designing and implementing scalable data infrastructure, real-time processing systems, and cloud-based analytics solutions. Proven track record of reducing costs by 40% and improving system performance by 300% through innovative data pipeline optimization.",
  experience: [
    {
      title: "Senior Data Engineer",
      company: "Tech Innovations Inc.",
      location: "San Francisco, CA",
      period: "Jan 2022 - Present",
      achievements: [
        "Led a team of 5 data engineers in designing scalable data pipelines processing 10TB+ daily",
        "Reduced data processing costs by 40% through pipeline optimization and infrastructure improvements",
        "Implemented streaming architecture with Kafka and Spark, reducing latency by 95%",
        "Migrated on-premise data warehouse to cloud, improving query performance by 300%",
      ],
      technologies: ["Apache Spark", "Kafka", "AWS", "Python", "Airflow", "Terraform", "Docker", "Kubernetes"],
    },
    {
      title: "Data Engineer",
      company: "Data Systems Co.",
      location: "Seattle, WA",
      period: "Mar 2020 - Dec 2021",
      achievements: [
        "Built real-time analytics platform processing 1M+ events per minute",
        "Implemented data catalog solution improving data discovery by 70%",
        "Reduced ETL job failures by 80% through improved error handling and monitoring",
        "Developed dashboards and visualizations for business stakeholders",
      ],
      technologies: ["Python", "Apache Spark", "Google Cloud Platform", "BigQuery", "Airflow", "Kafka"],
    },
    {
      title: "Junior Data Engineer",
      company: "Analytics Edge",
      location: "Boston, MA",
      period: "Jun 2018 - Feb 2020",
      achievements: [
        "Automated manual reporting processes, saving 20+ hours per week",
        "Improved data pipeline reliability from 85% to 99.5%",
        "Contributed to customer segmentation project increasing conversion by 35%",
        "Developed ETL pipelines using Python and SQL",
      ],
      technologies: ["Python", "SQL", "PostgreSQL", "Tableau", "PowerBI", "AWS"],
    },
  ],
  education: [
    {
      degree: "Bachelor of Science in Computer Science",
      school: "University of Technology",
      location: "Boston, MA",
      period: "2014 - 2018",
      details: "Concentration in Database Systems and Distributed Computing",
    },
  ],
  skills: {
    "Programming Languages": ["Python", "SQL", "Scala", "Java", "JavaScript"],
    "Data Processing": ["Apache Spark", "Apache Kafka", "Apache Airflow", "dbt", "Apache Flink"],
    "Cloud Platforms": ["AWS", "Google Cloud Platform", "Azure"],
    Databases: ["PostgreSQL", "MySQL", "MongoDB", "Redis", "Snowflake", "BigQuery"],
    "Tools & Technologies": ["Docker", "Kubernetes", "Terraform", "Git", "Jenkins", "Grafana"],
  },
  certifications: [
    "AWS Certified Data Engineer - Associate",
    "Google Cloud Professional Data Engineer",
    "Apache Spark Developer Certification",
    "Kubernetes Application Developer (CKAD)",
  ],
  projects: [
    {
      name: "Real-time Analytics Platform",
      description: "Built platform processing 10M+ events/day using Kafka, Spark Streaming, and ClickHouse",
      technologies: ["Kafka", "Spark Streaming", "ClickHouse", "Python"],
    },
    {
      name: "Multi-Cloud Data Lake",
      description: "Designed data lake architecture supporting AWS, GCP, and Azure with automated ingestion",
      technologies: ["AWS S3", "Google Cloud Storage", "Terraform", "Airflow"],
    },
  ],
}

export default function ResumePrintPage() {
  useEffect(() => {
    // Add print-specific styles
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
          
          .page-break {
            page-break-before: always;
          }
          
          .no-print {
            display: none;
          }
          
          h1 {
            font-size: 24px;
            margin-bottom: 8px;
          }
          
          h2 {
            font-size: 18px;
            margin-bottom: 6px;
          }
          
          h3 {
            font-size: 16px;
            margin-bottom: 8px;
            margin-top: 16px;
            border-bottom: 1px solid #ccc;
            padding-bottom: 2px;
          }
          
          h4 {
            font-size: 14px;
            margin-bottom: 4px;
          }
          
          .contact-info {
            text-align: center;
            margin-bottom: 16px;
          }
          
          .contact-item {
            display: inline-block;
            margin: 0 8px;
            font-size: 11px;
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
            margin: 8px 0;
          }
          
          .experience-achievements li {
            margin-bottom: 2px;
            font-size: 11px;
          }
          
          .tech-badge {
            display: inline-block;
            background: #f0f0f0;
            padding: 2px 6px;
            margin: 2px 2px 2px 0;
            border-radius: 3px;
            font-size: 10px;
            border: 1px solid #ddd;
          }
          
          .skills-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 12px;
            margin-top: 8px;
          }
          
          .skill-category {
            break-inside: avoid;
          }
          
          .skill-category h4 {
            font-size: 12px;
            margin-bottom: 4px;
            font-weight: 600;
          }
          
          .certifications-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 4px;
            margin-top: 8px;
          }
          
          .cert-item {
            font-size: 11px;
            margin-bottom: 2px;
          }
          
          .projects-section {
            margin-top: 16px;
          }
          
          .project-item {
            margin-bottom: 12px;
            break-inside: avoid;
          }
          
          .project-item h4 {
            font-size: 12px;
            margin-bottom: 2px;
          }
          
          .project-description {
            font-size: 11px;
            margin-bottom: 4px;
            color: #555;
          }
        }
        
        @media screen {
          .print-resume {
            max-width: 8.5in;
            margin: 0 auto;
            padding: 1in;
            background: white;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
            min-height: 11in;
          }
        }
      `}</style>

      <div className="resume-content">
        {/* Header */}
        <div className="contact-info">
          <h1>{resumeData.personalInfo.name}</h1>
          <h2 style={{ color: "#2563eb", marginBottom: "12px" }}>{resumeData.personalInfo.title}</h2>
          <div>
            <span className="contact-item">📧 {resumeData.personalInfo.email}</span>
            <span className="contact-item">📞 {resumeData.personalInfo.phone}</span>
            <span className="contact-item">📍 {resumeData.personalInfo.location}</span>
            <span className="contact-item">🌐 {resumeData.personalInfo.website}</span>
          </div>
          <div style={{ marginTop: "4px" }}>
            <span className="contact-item">💼 {resumeData.personalInfo.linkedin}</span>
            <span className="contact-item">💻 {resumeData.personalInfo.github}</span>
          </div>
        </div>

        {/* Summary */}
        <div>
          <h3>Professional Summary</h3>
          <p style={{ fontSize: "11px", lineHeight: "1.5", marginBottom: "16px" }}>{resumeData.summary}</p>
        </div>

        {/* Experience */}
        <div>
          <h3>Professional Experience</h3>
          {resumeData.experience.map((exp, index) => (
            <div key={index} className="experience-item">
              <div className="experience-header">
                <div>
                  <h4>{exp.title}</h4>
                  <div style={{ color: "#2563eb", fontSize: "12px", fontWeight: "500" }}>{exp.company}</div>
                </div>
                <div style={{ textAlign: "right", fontSize: "11px", color: "#666" }}>
                  <div>{exp.period}</div>
                  <div>{exp.location}</div>
                </div>
              </div>
              <ul className="experience-achievements" style={{ paddingLeft: "16px", margin: "8px 0" }}>
                {exp.achievements.map((achievement, idx) => (
                  <li key={idx}>{achievement}</li>
                ))}
              </ul>
              <div>
                {exp.technologies.map((tech) => (
                  <span key={tech} className="tech-badge">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Education */}
        <div>
          <h3>Education</h3>
          {resumeData.education.map((edu, index) => (
            <div key={index} style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
              <div>
                <h4>{edu.degree}</h4>
                <div style={{ color: "#2563eb", fontSize: "12px" }}>{edu.school}</div>
                <div style={{ fontSize: "11px", color: "#666" }}>{edu.details}</div>
              </div>
              <div style={{ textAlign: "right", fontSize: "11px", color: "#666" }}>
                <div>{edu.period}</div>
                <div>{edu.location}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Skills */}
        <div>
          <h3>Technical Skills</h3>
          <div className="skills-grid">
            {Object.entries(resumeData.skills).map(([category, skills]) => (
              <div key={category} className="skill-category">
                <h4>{category}</h4>
                <div>
                  {skills.map((skill) => (
                    <span key={skill} className="tech-badge">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div>
          <h3>Certifications</h3>
          <div className="certifications-grid">
            {resumeData.certifications.map((cert, index) => (
              <div key={index} className="cert-item">
                • {cert}
              </div>
            ))}
          </div>
        </div>

        {/* Key Projects */}
        <div className="projects-section">
          <h3>Key Projects</h3>
          {resumeData.projects.map((project, index) => (
            <div key={index} className="project-item">
              <h4>{project.name}</h4>
              <div className="project-description">{project.description}</div>
              <div>
                {project.technologies.map((tech) => (
                  <span key={tech} className="tech-badge">
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
