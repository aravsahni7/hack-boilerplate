// src/components/Button.jsx
export default function Button({ children, variant = 'primary', ...props }) {
    const base = 'px-4 py-2 font-semibold rounded';
    const colors = {
      primary:   'bg-primary text-white hover:bg-primary/90',
      secondary: 'bg-secondary text-black hover:bg-secondary/90'
    };
    return (
      <button className={`${base} ${colors[variant]}`} {...props}>
        {children}
      </button>
    );
  }
  