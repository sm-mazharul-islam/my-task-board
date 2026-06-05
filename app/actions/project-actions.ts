"use server";

import { PrismaClient } from "../generated/prisma"; // 1. The Bridge
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient(); // 2. The Shared Instance

// 3. The Retrieval Function
export async function getProjects() {
  try {
    // This is the SQL command being translated:
    // SELECT * FROM "Project" JOIN "Task" ON ...
    const projects = await prisma.project.findMany({
      include: {
        tasks: true, // Tells Prisma to fetch related tasks automatically
      },
      orderBy: { title: "asc" },
    });

    return projects; // Returns the data to the UI
  } catch (error) {
    console.error("Fetch Error:", error);
    return []; // Return empty list on failure
  }
}

export async function updateProject(id: string, newTitle: string) {
  try {
    await prisma.project.update({
      where: { id: id },
      data: { title: newTitle },
    });
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Update failed" };
  }
}

export async function deleteProject(id: string) {
  try {
    await prisma.project.delete({
      where: { id: id },
    });
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Delete failed" };
  }
}
