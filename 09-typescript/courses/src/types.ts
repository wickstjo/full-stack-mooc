interface Shared {
    name: string;
    exerciseCount: number;
    type: string;
}

interface Project extends Shared {
    type: "groupProject";
    groupProjectCount: number;
}

interface Described extends Shared {
    description: string;
}

interface Normal extends Described {
    type: "normal";
}
    
interface Submission extends Described {
    type: "submission";
    exerciseSubmissionLink: string;
}

interface Special extends Described {
    type: "special";
    requirements: string[];
}
    
type Course = Normal | Project | Submission | Special;

export type {
    Course
}