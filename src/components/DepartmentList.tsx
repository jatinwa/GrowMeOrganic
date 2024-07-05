import React, { useState } from 'react';
import { departments } from '../data/departments';
import { Department } from '../models/Department';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import Checkbox from '@mui/material/Checkbox';

function DepartmentList() {
  const [expandedDepartments, setExpandedDepartments] = useState<number[]>([]);
  const [selectedDepartments, setSelectedDepartments] = useState<{ [key: number]: boolean }>({});
  const [selectedSubDepartments, setSelectedSubDepartments] = useState<{ [key: number]: boolean }>({});

  const toggleExpand = (id: number) => {
    setExpandedDepartments(prevState =>
      prevState.includes(id)
        ? prevState.filter(depId => depId !== id)
        : [...prevState, id]
    );
  };

  const toggleSelectDepartment = (id: number) => {
    const isSelected = !selectedDepartments[id];
    setSelectedDepartments(prevState => ({
      ...prevState,
      [id]: isSelected,
    }));

    departments.forEach(department => {
      if (department.id === id) {
        department.subDepartments.forEach(subDept => {
          setSelectedSubDepartments(prevState => ({
            ...prevState,
            [subDept.id]: isSelected,
          }));
        });
      }
    });
  };

  const toggleSelectSubDepartment = (depId: number, subDeptId: number) => {
    const isSelected = !selectedSubDepartments[subDeptId];
    setSelectedSubDepartments(prevState => ({
      ...prevState,
      [subDeptId]: isSelected,
    }));

    let allSelected = true;
    departments.forEach(department => {
      if (department.id === depId) {
        department.subDepartments.forEach(subDept => {
          if (subDept.id !== subDeptId && !selectedSubDepartments[subDept.id]) {
            allSelected = false;
          }
        });
      }
    });

    setSelectedDepartments(prevState => ({
      ...prevState,
      [depId]: allSelected,
    }));
  };

  return (
    <div className="p-4">
      {departments?.map((department: Department) => (
        <div key={department.id} className="mb-4">
          <div className="flex items-center cursor-pointer" onClick={() => toggleExpand(department.id)}>
            <Checkbox
              checked={selectedDepartments[department.id] || false}
              onChange={() => toggleSelectDepartment(department.id)}
              onClick={(e) => e.stopPropagation()}
            />
            <span className="font-bold">{department.name}</span>
            {expandedDepartments.includes(department.id) ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </div>
          {expandedDepartments.includes(department.id) && (
            <ul className="pl-4 mt-2">
              {department.subDepartments.map(subDept => (
                <li key={subDept.id} className="list-disc">
                  <div className="flex items-center">
                    <Checkbox
                      checked={selectedSubDepartments[subDept.id] || false}
                      onChange={() => toggleSelectSubDepartment(department.id, subDept.id)}
                    />
                    {subDept.name}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
};

export default DepartmentList;






