import React from 'react'
import labels from "../constants/labels";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ProfileData } from '@/types/types';

// Keep React in scope for JSX linting, without triggering unused-import warnings.
void React;

type ProfileInfoProps = {
  profilePhoto: string;
  profile: ProfileData;
};

const ProfileInfo = ({ profilePhoto, profile }: ProfileInfoProps) => {
  return (
    <Card className="w-full flex flex-row items-center gap-6 p-6">
        <div className="w-40 h-auto rounded-full overflow-hidden shrink-0">
            <img src={profilePhoto} className="w-full h-full object-cover" />
        </div>
        <div>
            <CardHeader>
                <CardTitle className="text-2xl">
                    {profile!["first_name"]}{" "}
                    {profile!["middle_initial"] && profile!["middle_initial"] + ". "}
                    {profile!["last_name"]}
                </CardTitle>
            </CardHeader>
            <CardContent>
                {profile!.pronouns && <p className="font-light mt-3">{profile!.pronouns}</p>}
                <p className="mt-4 font-light">
                    {profile!.uniqname}@umich.edu
                </p>
                {profile!.roles && (
                    <div className="flex mt-10">
                        {profile!.roles.map((role) => (
                            <p
                                key={role}
                                className="py-2 px-5 border border-neutral-300 rounded-3xl mr-3 text-xl"
                            >
                                {labels[role]}
                            </p>
                        ))}
                    </div>
                )}
            </CardContent>
        </div>
    </Card>
  )
}

export default ProfileInfo