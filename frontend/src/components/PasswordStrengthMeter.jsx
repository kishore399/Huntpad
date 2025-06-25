import { X, Check } from "lucide-react";


const PasswordCriteria = ({ password }) => {

    const criteria = [
        { text: "At least 6 characters long", valid: password.length >= 6 },
        { text: "Contains uppercase letter", valid: /[A-Z]/.test(password) },
        { text: "Contains lowercase letter", valid: /[a-z]/.test(password) },
        { text: "Contains number", valid: /\d/.test(password) },
        { text: "Contains special character", valid: /[^A-Za-z0-9]/.test(password) }
    ]
    return (
        <div className="flex flex-col text-sm mt-2">
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

const getStrength = (strength) => {
    if (strength === 0) return "very Weak";
    if (strength === 1) return "weak";
    if (strength === 2) return "moderate";
    if (strength === 3) return "strong";
    return "very strong";
}

const getColor = (strength) => {
    switch (strength) {
        case 0:
            return "bg-red-300";
        case 1:
            return "bg-red-500";
        case 2:
            return "bg-orange-500";
        case 3:
            return "bg-yellow-500";
        case 4:
            return "bg-green-500";
        default:
            return "bg-gray-300";
    }
}

const PasswordStrengthMeter = ({ password }) => {
    
    let strength = 0;
    if (password.length >= 6) strength++;
    if (/[A-Z]/.test(password) && /[a-z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;

    const strengthText = getStrength(strength);
    const strengthColor = getColor(strength);

  return (
    <div className="mt-4">
        <div className="flex justify-between text-sm mb-1">
            <span>Password Strength</span>
            <span>{strengthText}</span>
        </div>
        <div className="flex w-full gap-1">
            { [...Array(4)].map((_, index) => (
                <div key={index} className={`flex-1 h-1 rounded-full ${index < strength ? strengthColor : "bg-gray-300"}`}/>
            )) }
        </div>
        <PasswordCriteria password={password} />
    </div>
  )
}
export default PasswordStrengthMeter