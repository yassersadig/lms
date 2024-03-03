import useAuthUser from 'react-auth-kit/hooks/useAuthUser';


const Courses = () => {
    const user = useAuthUser();
    return (
        <div className="flex flex-col h-screen items-center justify-center">
            <div>Welcome {user.name},</div>
            <div>Somthing cool is coming soon...</div>
        </div>
    );
}

export default Courses;