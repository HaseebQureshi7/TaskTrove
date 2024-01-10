type ProjectTypes = {
    _id?: string;
    name: string;
    budget: number;
    deadline: number;
    description: string;
    projectOwner: string;
    allotedTo?: string;
    acceptedBid?: string;
    allotmentDate?: string;
    completionDate?: string;
    projectStatus?: "Incomplete" | "InProgress" | "Completed";
    paymentReceived?: Boolean;
    createdAt?: Date;
    updatedAt?: Date;
  };
  
  export default ProjectTypes;
  