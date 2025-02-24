
"use client";
import React, { useState, useEffect} from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"; 
import Image from "next/image";

const initialProfileFields = [
  { key: "enrollmentNo", label: "Enrollment No", value: "-" },
  { key: "name", label: "Name", value: "-" },
  { key: "email", label: "Email", value: "-" },
  { key: "dob", label: "Date of Birth", value: "-" },
  { key: "fullAddress", label: "Full Address", value: "-" },
  { key: "mobile", label: "Mobile Number", value: "-" },
  { key: "gender", label: "Gender", value: "-" },
  { key: "category", label: "Category", value: "-" },
  { key: "region", label: "Region", value: "-" },
  { key: "fatherName", label: "Father's Name", value: "-" },
  { key: "motherName", label: "Mother's Name", value: "-" },
  { key: "fatherQualification", label: "Father's Qualification", value: "-" },
  { key: "motherQualification", label: "Mother's Qualification", value: "-" },
  { key: "fatherOccupation", label: "Father's Occupation", value: "-" },
  { key: "motherOccupation", label: "Mother's Occupation", value: "-" },
  { key: "fatherJobDesignation", label: "Father's Job Designation", value: "-" },
  { key: "motherJobDesignation", label: "Mother's Job Designation", value: "-" },
  { key: "fatherBusinessType", label: "Father's Business Type", value: "-" },
  { key: "motherBusinessType", label: "Mother's Business Type", value: "-" },
  { key: "fatherMobile", label: "Father's Mobile", value: "-" },
  { key: "motherMobile", label: "Mother's Mobile", value: "-" },
  { key: "fatherOfficeAddress", label: "Father's Office Address", value: "-" },
  { key: "motherOfficeAddress", label: "Mother's Office Address", value: "-" },
  { key: "guardianName", label: "Guardian Name", value: "-" },
  { key: "board12th", label: "12th Board", value: "-" },
  { key: "yearOf12th", label: "Year of 12th", value: "-" },
  { key: "rollno12th", label: "12th Roll Number", value: "-" },
  { key: "school12th", label: "12th School Name", value: "-" },
  { key: "aggregate12th", label: "12th Aggregate (%)", value: "-" },
  { key: "board10th", label: "10th Board", value: "-" },
  { key: "yearOf10th", label: "Year of 10th", value: "-" },
  { key: "rollno10th", label: "10th Roll Number", value: "-" },
  { key: "school10th", label: "10th School Name", value: "-" },
  { key: "aggregate10th", label: "10th Aggregate (%)", value: "-" },
  { key: "jeeRank", label: "JEE Rank", value: "-" },
  { key: "jeePercentile", label: "JEE Percentile", value: "-" },
  { key: "jeeRollno", label: "JEE Roll Number", value: "-" },
  { key: "specialAchievements", label: "Special Achievements", value: "-" },
  { key: "passportPhotograph", label: "Passport Photograph", value: "-" },
  { key: "marksheet10th", label: "10th Marksheet", value: "-" },
  { key: "marksheet12th", label: "12th Marksheet", value: "-" },
  { key: "aadhar", label: "Aadhar Card", value: "-" },
  { key: "pancard", label: "PAN Card", value: "-" },
];

const ProfilePage = () => {
  const [profileFields, setProfileFields] = useState(initialProfileFields);
  const [isEditing, setIsEditing] = useState(false);
  const params = useParams()
  const id = params.id;



  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await fetch(`/api/student/profile/${id}`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const result = await response.json();
        

        if (result.success && result.data) {
          setProfileFields((prevFields) =>
            prevFields.map((field) => ({
              ...field,
              value: result.data[field.key] || field.value, 
            }))
          );
        } else {
          console.error("Invalid API response:", result);
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchProfileData();
  }, []);

  const handleChange = (key: string, newValue: string) => {
    setProfileFields((prevFields) =>
      prevFields.map((field) =>
        field.key === key ? { ...field, value: newValue } : field
      )
    );
  };

  const handleSave = async () => {
    try {
      const updatedData = Object.fromEntries(profileFields.map(field => [field.key, field.value]));
       console.log("Sending Data:", updatedData); // Debugging
      const response = await fetch(`http://localhost:3000/api/student/profile/cm71ie2hu0000ev6wq1jcax4d`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({updatedData}),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Response from API:", result); 
      if (result.success) {
        alert("Profile updated successfully!");
      } else {
        alert("Failed to update profile.");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
    setIsEditing(false);
  };

  return (
    <div className="p-6 border-2 border-gray-300 rounded-lg shadow-lg w-full mx-auto">
      {/* Profile Header */}
      <div className="flex justify-between items-center border-b-2 pb-4 mb-4">
        <h1 className="text-2xl font-bold">Profile</h1>
        <Button onClick={() => (isEditing ? handleSave() : setIsEditing(true))}>
          {isEditing ? "Save" : "Edit"}
        </Button>

      </div>

      {/* Profile Picture & Basic Info */}
      <div className="flex justify-between items-center border-b-2 pb-4 mb-4">
      <Image
  src='/images/profile.jpg'
  
  alt="Profile"
  width={140}
  height={140}
  className="rounded-full border-2 shadow-md"
/>

        <div>
          <div>
            <h2 className="text-xl font-bold">Full Name</h2>
            <p className="text-lg">
              {profileFields.find((field) => field.key === "name")?.value}
            </p>
          </div>
          <div>
            <h2 className="text-xl font-bold">Enrollment Number</h2>
            <p className="text-lg">
              {profileFields.find((field) => field.key === "enrollmentNo")?.value}
            </p>
          </div>
          <div>
            <h2 className="text-xl font-bold">Email</h2>
            <p className="text-lg">
              {profileFields.find((field) => field.key === "email")?.value}
            </p>
          </div>
        </div>
      </div>

      {/* Profile Fields */}
      <div>
        <div className="grid grid-cols-2 gap-4 px-4">
          {profileFields.map((field) => (
            <div key={field.key} className="mb-2">
              <label className="font-bold">{field.label}</label>
              {isEditing ? (
                <Input
                  type="text"
                  value={field.value}
                  onChange={(e) => handleChange(field.key, e.target.value)}
                />
              ) : (
                <p className="text-gray-700">{field.value}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;