"use client";
import React, { useState,useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"; 
import { useParams } from "next/navigation";
import Image from "next/image";

const initialProfileFields = [
  { key: "name", label: "Name", value: "-" },
  { key: "email", label: "Email", value: "-" },
  { key: "password", label: "Password", value: "-" },
  
];

const ProfilePage = () => {
     const [profileFields, setProfileFields] = useState(initialProfileFields);
      const [isEditing, setIsEditing] = useState(false);
       const params = useParams()
        const userId = params.id;
    
      useEffect(() => {
        const fetchProfileData = async () => {
          try {
            const response = await fetch(`http://localhost:3000/api/faculty/staff/${userId}`);
            
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
          const response = await fetch(`http://localhost:3000/api/faculty/staff/${userId}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedData),
          });
    
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
    
          const result = await response.json();
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

      {/* Profile Picture & Email */}
      <div className="flex items-center gap-6 border-b-2 pb-4 mb-4">
        <Image
          src="/placeholder.jpg"
          alt="Profile"
          width={140}
          height={140}
          className="rounded-full border-2 shadow-md"
        />
        <div>
          <h2 className="text-xl font-bold">Email</h2>
          <p className="text-lg">
            {profileFields.find((field) => field.key === "email")?.value}
          </p>
        </div>
      </div>

      {/* Profile Fields */}
      <div>
        <div className="grid grid-cols-1 gap-4 px-4">
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
