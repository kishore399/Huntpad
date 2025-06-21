import { X, Check } from "lucide-react";


const PasswordCriteria = ({ password }) => {

    const criteria = [
        { text: "At least 6 characters long", valid: password.length >= 6, strength: 1 },
        { text: "Contains uppercase letter", valid: /[A-Z]/.test(password), strength: 0.5 },
        { text: "Contains lowercase letter", valid: /[a-z]/.test(password), strength: 0.5 },
        { text: "Contains number", valid: /\d/.test(password), strength: 1 },
        { text: "Contains special character", valid: /[^A-Za-z0-9]/.test(password), strength: 1 }
    ]
    return (
        <div className="flex flex-col text-sm mt-4">
            {criteria.map((criteria, index) => 
                <div key={index} className="flex items-center gap-2">
                    {criteria.valid ? (
                        <Check className="text-green-400"/>
                    ) : (
                        <X className="text-red-400"/>
                    )
                }
                    <span className={`${criteria.valid? "text-green-500" : "text-slate-600"}`}> {criteria.text} </span>
                </div>
            )}
        </div>
    )
}

const getStrength = (password) => {
    const strength = criteria.reduce((acc,curr) => acc + (curr.valid ? curr.strength : 0), 0);
    if (strength < 1) return "very Weak";
    if (strength < 2) return "weak";
    if (strength < 3) return "medium";
    return "strong";
}

const getColor = (strength) => {
    switch (strength) {
        case "very Weak":
            return "text-red-500";
        case "weak":
            return "text-yellow-500";
        case "medium":
            return "text-orange-500";
        case "strong":
            return "text-green-500";
        default:
            return "text-gray-500";
    }
}

const PasswordStrength = ({ password }) => {
 
  return (
    <div>
        <h1>Hello</h1>
        <PasswordCriteria password={password} />
    </div>
  )
}

export default PasswordStrength