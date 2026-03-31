import "./toggle.css";
interface ToggleProps {
   checked: boolean;
   onChange: (val: boolean) => void;
   id: string;
}
export const Toggle: React.FC<ToggleProps> = ({ checked, onChange, id }) => (
    <label className="toggle" htmlFor={id}>
        <input
            id={id}
            type="checkbox"
            checked={checked}
            onChange={(e) => onChange(e.target.checked)}
        />
        <span className="toggleSlider" />
    </label>
);