"use server"; // Tells Next.js that all exported functions here run exclusively on the server

import { revalidatePath } from "next/cache"; // Imports a helper to refresh the UI after data changes
import { prisma } from "../lib/prisma"; // Imports your shared Prisma client instance
import { Prisma } from "../generated/prisma"; // 1. Import Prisma
// 1. Function to retrieve all projects from the database
export async function getProjects() {
  try {
    // Simplified query to rule out relational issues
    const projects = await prisma.project.findMany();
    console.log("DEBUG: Raw projects without tasks:", projects);
    return projects;
  } catch (error) {
    console.error("DEBUG: Query failed:", error);
    return [];
  }
}

// 2. Function to update an existing project's title
export async function updateProject(
  id: string,
  newTitle: string,
  newDescription: string,
) {
  try {
    // Updates a specific project record found by its ID
    await prisma.project.update({
      where: { id: id }, // Finds the project using the unique ID
      data: { title: newTitle, description: newDescription }, // Sets the new title provided by the user
    });
    revalidatePath("/"); // Tells Next.js to re-fetch data for the home page to reflect the update
    return { success: true }; // Returns a success indicator to the frontend
  } catch (error) {
    return { success: false, error: "Update failed" }; // Returns an error object if the database update fails
  }
}

// 3. Function to delete a project from the database
export async function deleteProject(id: string) {
  try {
    // Deletes the project record matching the provided ID
    await prisma.project.delete({
      where: { id: id }, // Locates the record to be removed
    });
    revalidatePath("/"); // Refreshes the home page so the deleted project disappears from the UI
    return { success: true }; // Confirms the deletion to the frontend
  } catch (error) {
    return { success: false, error: "Delete failed" }; // Handles cases where deletion might fail (e.g., database lock)
  }
}

// app/actions/project-actions.ts

export async function createProject(formData: FormData) {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;

  try {
    // 1. Explicitly define all fields that UncheckedCreateInput expects,
    // even the ones you want to be null.
    const projectData = {
      title,
      description,
      userId: null, // Explicitly provide null to satisfy the type requirement
    };

    // 2. Perform the double-cast: unknown -> UncheckedCreateInput
    // This tells TypeScript: "I know what I'm doing, ignore the overlap check."
    await prisma.project.create({
      data: projectData as unknown as Prisma.ProjectUncheckedCreateInput,
    });

    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Database Create Error:", error);
    return { error: "Failed to create project" };
  }
}
