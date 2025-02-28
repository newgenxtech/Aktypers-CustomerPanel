import { useState, useEffect } from 'react';
import { Card, Avatar, Upload as UploadHandler, Button, Form } from 'antd';
import {
    CircleUserRound,
    Upload
} from 'lucide-react';
import { useGetUserProfile, useUploadProfilePicture } from '@/hooks/GetHooks';

const ProfileListPage = () => {
    const [form] = Form.useForm();
    const [imageUrl, setImageUrl] = useState<string>();
    const [isUploading, setIsUploading] = useState(false);

    const { data: profileData, isLoading, error } = useGetUserProfile();
    const uploadMutation = useUploadProfilePicture();

    useEffect(() => {
        if (profileData?.pic) {
            setImageUrl(`https://aktyres-in.stackstaging.com/php-truck/${profileData.pic}`);
        }
    }, [profileData]);

    const handleUpload = async (file: File) => {
        setIsUploading(true);
        try {
            await uploadMutation.mutateAsync(file);
        } catch (error) {
            console.error('Upload error:', error);
        } finally {
            setIsUploading(false);
        }
    };

    useEffect(() => {
        if (profileData?.pic) {
            setImageUrl(`https://aktyres-in.stackstaging.com/php-truck/${profileData.pic}`);
        }
    }, [profileData]);

    // const handleUpload = async (file: File) => {
    //     try {
    //         await uploadMutation.mutateAsync(file);
    //     } catch (error) {
    //         console.error('Upload error:', error);
    //     }
    // };

    if (isLoading) {
        return <div className="flex items-center justify-center h-screen">Loading...</div>;
    }

    if (error) {
        return (
            <div className="flex items-center justify-center h-screen text-red-500">
                Error loading profile data
            </div>
        );
    }

    return (
        <div className="p-6">
            <Card title="Profile Information" className="max-w-3xl mx-auto">
                <div className="flex flex-col md:flex-row gap-8">
                    <div className="flex flex-col items-center gap-4">
                        <Avatar
                            size={120}
                            icon={<CircleUserRound />}
                            src={imageUrl}
                        />
                        <UploadHandler
                            accept="image/*"
                            showUploadList={false}
                            beforeUpload={(file) => {
                                handleUpload(file);
                                return false;
                            }}
                            disabled={isUploading}
                        >
                            <Button
                                icon={<Upload className="h-4 w-4" />}
                                loading={isUploading}
                                disabled={isUploading}
                            >
                                {imageUrl ? 'Change Picture' : 'Upload Picture'}
                            </Button>
                        </UploadHandler>
                    </div>

                    <div className="flex-1">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="font-semibold">Name</label>
                                <p>{profileData?.name}</p>
                            </div>
                            <div>
                                <label className="font-semibold">Username</label>
                                <p>{profileData?.username}</p>
                            </div>
                            <div>
                                <label className="font-semibold">Email</label>
                                <p>{profileData?.email}</p>
                            </div>
                            <div>
                                <label className="font-semibold">Customer ID</label>
                                <p>{profileData?.customer_id}</p>
                            </div>
                            <div className="md:col-span-2">
                                <label className="font-semibold">Company Name</label>
                                <p>{profileData?.companyname}</p>
                            </div>
                            <div className="md:col-span-2">
                                <label className="font-semibold">Company Address</label>
                                <p>{profileData?.companyAddress}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default ProfileListPage;
