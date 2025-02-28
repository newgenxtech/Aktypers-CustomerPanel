import { useState, useEffect } from 'react';
import { Card, Avatar, Upload as UploadHandler, Button, Form, Spin, message } from 'antd';
import { CircleUserRound, Upload, Mail, User, Building2, MapPin, BadgeCheck } from 'lucide-react';
import { handleFileUpload, useGetUserProfile, useUploadProfilePicture } from '@/hooks/GetHooks';
import { motion } from 'framer-motion';

const ProfileListPage = () => {
    const [form] = Form.useForm();
    console.log(form);
    const [imageUrl, setImageUrl] = useState<string>();
    const [isUploading, setIsUploading] = useState(false);

    const { data: profileData, isLoading, error } = useGetUserProfile();
    const uploadMutation = useUploadProfilePicture();
    useEffect(() => {
        if (profileData?.pic) {
            setImageUrl(`https://aktyres-in.stackstaging.com/php-truck/class/${profileData.pic}`);
        }
    }, [profileData]);

    const handleUpload = async (file: File) => {
        setIsUploading(true);
        try {
            const FilePath = await handleFileUpload(file);
            if (!FilePath) {
                message.error('Upload failed');
                console.error('Upload failed');
                return;
            }
            await uploadMutation.mutateAsync(FilePath[0].location);
        } catch (error) {
            console.error('Upload error:', error);
        } finally {
            setIsUploading(false);
        }
    };

    useEffect(() => {
        if (profileData?.pic) {
            setImageUrl(`https://aktyres-in.stackstaging.com/php-truck/class/${profileData.pic}`);
        }
    }, [profileData]);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <Spin size="large" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center h-screen text-red-500">
                Error loading profile data
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="p-6 bg-gray-50 min-h-screen"
        >
            <Card
                title={<h1 className="text-2xl font-bold text-gray-800">Profile Information</h1>}
                className="max-w-7xl mx-auto shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
                <div className="flex flex-col md:flex-row gap-8">
                    <motion.div
                        className="flex flex-col items-center gap-4"
                        whileHover={{ scale: 1.02 }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        <div className="relative group">
                            <Avatar
                                size={150}
                                icon={<CircleUserRound className="text-gray-400" />}
                                src={imageUrl}
                                className="border-4 border-white shadow-lg object-scale-down"
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
                                    type="primary"
                                    icon={<Upload className="h-4 w-4" />}
                                    loading={isUploading}
                                    disabled={isUploading}
                                    className="mt-4 bg-blue-500 hover:bg-blue-600 border-none shadow-md hover:shadow-lg transition-all duration-300"
                                >
                                    {imageUrl ? 'Change Picture' : 'Upload Picture'}
                                </Button>
                            </UploadHandler>
                        </div>
                    </motion.div>

                    <div className="flex-1 mt-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <motion.div
                                className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
                                whileHover={{ y: -2 }}
                            >
                                <div className="flex items-center gap-2 mb-2">
                                    <User className="h-5 w-5 text-blue-500" />
                                    <label className="font-semibold text-gray-700">Name</label>
                                </div>
                                <p className="text-gray-800">{profileData?.name}</p>
                            </motion.div>
                            <motion.div
                                className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
                                whileHover={{ y: -2 }}
                            >
                                <div className="flex items-center gap-2 mb-2">
                                    <BadgeCheck className="h-5 w-5 text-blue-500" />
                                    <label className="font-semibold text-gray-700">Username</label>
                                </div>
                                <p className="text-gray-800">{profileData?.username}</p>
                            </motion.div>
                            <motion.div
                                className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
                                whileHover={{ y: -2 }}
                            >
                                <div className="flex items-center gap-2 mb-2">
                                    <Mail className="h-5 w-5 text-blue-500" />
                                    <label className="font-semibold text-gray-700">Email</label>
                                </div>
                                <p className="text-gray-800">{profileData?.email}</p>
                            </motion.div>
                            <motion.div
                                className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
                                whileHover={{ y: -2 }}
                            >
                                <div className="flex items-center gap-2 mb-2">
                                    <BadgeCheck className="h-5 w-5 text-blue-500" />
                                    <label className="font-semibold text-gray-700">Customer ID</label>
                                </div>
                                <p className="text-gray-800">{profileData?.customer_id}</p>
                            </motion.div>
                            <motion.div
                                className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 md:col-span-2"
                                whileHover={{ y: -2 }}
                            >
                                <div className="flex items-center gap-2 mb-2">
                                    <Building2 className="h-5 w-5 text-blue-500" />
                                    <label className="font-semibold text-gray-700">Company Name</label>
                                </div>
                                <p className="text-gray-800">{profileData?.companyname}</p>
                            </motion.div>
                            <motion.div
                                className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 md:col-span-2"
                                whileHover={{ y: -2 }}
                            >
                                <div className="flex items-center gap-2 mb-2">
                                    <MapPin className="h-5 w-5 text-blue-500" />
                                    <label className="font-semibold text-gray-700">Company Address</label>
                                </div>
                                <p className="text-gray-800">{profileData?.companyAddress}</p>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </Card>
        </motion.div>
    );
};

export default ProfileListPage;
