// import { cookies } from "next/headers";

export interface Skill {
  id: string;
  title: string;
  description: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  _count?: {
    tasks: number;
    reflections: number;
  };
}
export interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  skillId: string;
  createdAt: string;
  updatedAt: string;
  skill?: Skill;
}

// Get all skills
export async function getAllSkills(): Promise<{ skills: Skill[] }> {
  //   const cookieStore = await cookies();
  const response = await fetch("/api/skills", {
    method: "GET",
    // headers: {
    //   cookie: cookieStore.toString(),
    // },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to fetch skills");
  }

  return response.json();
}

// Get skill by ID
export async function getSkillById(id: string): Promise<{ skill: Skill }> {
  //   const cookieStore = await cookies();
  const response = await fetch(`/api/skills/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      //   cookie: cookieStore.toString(),
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to fetch skill");
  }

  return response.json();
}
export async function createSkill(skillData: {
  title: string;
  description?: string;
}): Promise<{ skill: Skill }> {
  const response = await fetch("/api/skills", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(skillData),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to create skill");
  }

  return response.json();
}

// Update a skill
export async function updateSkill(
  id: string,
  skillData: { title?: string; description?: string }
): Promise<{ skill: Skill }> {
  //   const cookieStore = await cookies();
  const response = await fetch(`/api/skills/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      //   cookie: cookieStore.toString(),
    },
    body: JSON.stringify(skillData),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to update skill");
  }

  return response.json();
}

// Delete a skill
export async function deleteSkill(id: string): Promise<{ message: string }> {
  //   const cookieStore = await cookies();
  const response = await fetch(`/api/skills/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      //   cookie: cookieStore.toString(),
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to delete skill");
  }

  return response.json();
}

// Create a new task
// Create a new task (with only title and createdAt)
export async function createTask(taskData: {
  title: string;
  createdAt: string;
  skillId: string;
}): Promise<{ task: Task }> {
  try {
    const response = await fetch("/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...taskData,
        createdAt: new Date(taskData.createdAt),
      }),
    });
    // console.log(await response.json());

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to create task");
    }
    return await response.json();
  } catch (error: any) {
    throw new Error(error.message || "An unexpected error occurred");
  }
}

export const createReflection = async ({
  content,
  skillId,
}: {
  content: string;
  skillId: string;
}) => {
  try {
    const response = await fetch("/api/reflections", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content,
        skillId,
      }),
    });
    // console.log(await response.json());

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to create reflection");
    }
    return await response.json();
  } catch (error: any) {
    throw new Error(error.message || "An unexpected error occurred");
  }
};
