'use client';

interface EducationalResource {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  readTime: string;
}

const ArrowIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="ml-1 h-4 w-4"
  >
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </svg>
);

const educationalResources: EducationalResource[] = [
  {
    id: '1',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-5 w-5"
      >
        <path d="M18 6 7 17l-5-5" />
        <path d="m22 10-7.5 7.5L13 16" />
      </svg>
    ),
    title: 'Investment Strategies for Beginners',
    description:
      'Learn the basics of investing, including diversification, risk management, and long-term planning strategies tailored for the Vietnamese market.',
    readTime: '10 min read',
  },
  {
    id: '2',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-5 w-5"
      >
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
      </svg>
    ),
    title: 'Understanding the Vietnamese Stock Market',
    description:
      'Get familiar with HOSE, HNX, and how the Vietnamese stock market operates compared to global markets. Learn about local regulations and trading practices.',
    readTime: '15 min read',
  },
];

const ResourceCard = ({ resource }: { resource: EducationalResource }) => (
  <div className="group relative overflow-hidden rounded-lg border bg-card shadow-sm hover:shadow-md transition-all">
    <div className="absolute top-0 right-0 h-24 w-24 translate-x-8 -translate-y-8 transform rounded-full bg-primary/20 blur-2xl group-hover:bg-primary/30 transition-colors"></div>
    <div className="p-6 relative">
      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
        {resource.icon}
      </div>
      <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
        {resource.title}
      </h3>
      <p className="text-muted-foreground mb-4">{resource.description}</p>
      <div className="flex items-center justify-between">
        <button className="inline-flex items-center text-sm font-medium text-primary hover:underline">
          Read More
          <ArrowIcon />
        </button>
        <div className="text-sm text-muted-foreground">{resource.readTime}</div>
      </div>
    </div>
  </div>
);

export const EducationSection = () => {
  return (
    <section className="container">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold tracking-tight">Educational Resources</h2>
        <button className="text-primary hover:underline inline-flex items-center">
          View All
          <ArrowIcon />
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {educationalResources.map((resource) => (
          <ResourceCard key={resource.id} resource={resource} />
        ))}
      </div>
    </section>
  );
};
