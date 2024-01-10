type UserTypes = {
    createdAt: string;
    email: string;
    isBlocked: boolean;
    name: string;
    password: string;
    role: "admin" | "client" | "freelancer";
    updatedAt: string;
    __v: number;
    _id: string;
};

export default UserTypes