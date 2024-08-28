import { Check, X } from 'lucide-react';
import React from 'react';

const PasswordCriteria = ({ password }) => {
  const pwdCriteria = [
    { desc: "6 characters minimum", achieved: password.length >= 6 },
    { desc: "At least one lowercase letter", achieved: /[a-z]/.test(password) },
    { desc: "At least one uppercase letter", achieved: /[A-Z]/.test(password) },
    { desc: "At least one number", achieved: /[0-9]/.test(password) },
    { desc: "At least one special character", achieved: /[^A-Za-z0-9]/.test(password) }
  ];

  return (
    <ul className="list-disc pl-0 space-y-1 text-xs text-gray-200">
      {pwdCriteria.map((criteria, index) => (
        <li key={index} className="flex items-center space-x-2">
          <span
            className={`h-4 w-4 rounded-full flex items-center justify-center mt-1 ${
              criteria.achieved ? "text-green-500" : "text-gray-500"
            }`}
          >
            {criteria.achieved ? <Check className='w-4 h-4' /> : <X className='w-4 h-4' />}
          </span>
          <span>{criteria.desc}</span>
        </li>
      ))}
    </ul>
  );
}

const PasswordMeter = ({ password }) => {
  const meetCriteria = (passCriteria) => {
    let achieved = 0;
    if (passCriteria.length >= 6) achieved++;
    if (passCriteria.match(/[a-z]/)) achieved++;
    if (passCriteria.match(/[A-Z]/)) achieved++;
    if (passCriteria.match(/[0-9]/)) achieved++;
    if (passCriteria.match(/[^A-Za-z0-9]/)) achieved++;
    return achieved;
  };

  const achieved = meetCriteria(password);

  const getColor = (index) => {
    // If achieved criteria are met or exceeded, color all as green
    if (achieved >= 5) {
      return "bg-green-500";
    }

    // Apply color based on the index and achieved criteria
    if (index < achieved) {
      if (index === 0) return "bg-red-500";
      if (index === 1 || index === 2) return "bg-yellow-500";
      if (index === 3) return "bg-amber-500";
    }

    // Color for unachieved segments
    return "bg-gray-500";
  };

  const meetCriteriaText = (achieved) => {
    switch (achieved) {
      case 0: return "Very weak";
      case 1: return "Weak";
      case 2: return "Fair";
      case 3: return "Good";
      case 4: return "Better";
      default: return "Excellent";
    }
  };

  return (
    <div className='mt-2'>
      <div className="flex justify-between items-center mb-1">
        <span className="text-xs text-gray-400">Password strength</span>
        <span className="text-xs text-gray-400">{meetCriteriaText(achieved)}</span>
      </div>
      <div className="flex space-x-2">
        {[...Array(5)].map((_, index) => (
          <div
            key={index}
            className={`h-1 w-1/5 rounded-full transition-colors duration-300 mb-1 ${
              getColor(index)
            }`}
          />
        ))}
      </div>
      <PasswordCriteria password={password} />
    </div>
  );
}

export default PasswordMeter;
