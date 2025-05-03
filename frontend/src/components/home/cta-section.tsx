'use client';

interface ButtonProps {
  label: string;
  variant: 'primary' | 'secondary';
  onClick?: () => void;
}

interface CtaSectionProps {
  title: string;
  description: string;
  buttons: ButtonProps[];
}

const Button = ({ label, variant, onClick }: ButtonProps) => {
  const baseStyles =
    'inline-flex h-11 items-center justify-center rounded-md px-8 text-sm font-medium shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50';

  const variantStyles = {
    primary: 'bg-primary text-primary-foreground hover:bg-primary/90',
    secondary: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
  };

  return (
    <button className={`${baseStyles} ${variantStyles[variant]}`} onClick={onClick}>
      {label}
    </button>
  );
};

export const CtaSection = ({
  title = 'Ready to start investing?',
  description = 'Create an account to track your favorite stocks, get personalized news, and access premium educational content.',
  buttons = [
    { label: 'Sign Up Now', variant: 'primary' },
    { label: 'Learn More', variant: 'secondary' },
  ],
}: Partial<CtaSectionProps>) => {
  return (
    <section className="container">
      <div className="rounded-xl bg-primary/10 p-8 md:p-10 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.5))] dark:bg-grid-black/10"></div>
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-md">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">{title}</h2>
            <p className="text-muted-foreground">{description}</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            {buttons.map((button, index) => (
              <Button key={index} {...button} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
