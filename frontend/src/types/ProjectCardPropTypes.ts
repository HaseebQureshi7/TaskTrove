import { Dispatch, SetStateAction } from "react";
import ProjectTypes from "./ProjectTypes";

type ProjectCardTypes = {
    project: ProjectTypes;
    setOpenModal?: Dispatch<SetStateAction<boolean>>;
    setCurrentProject?: Dispatch<SetStateAction<string | undefined>>;
};

export default ProjectCardTypes;