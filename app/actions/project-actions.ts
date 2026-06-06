"use server"; // Tells Next.js that all exported functions here run exclusively on the server

import { revalidatePath } from "next/cache"; // Imports a helper to refresh the UI after data changes
import { prisma } from "../lib/prisma"; // Imports your shared Prisma client instance
import { Prisma } from "../generated/prisma"; // 1. Import Prisma
// 1. Function to retrieve all projects from the database
export async function getProjects() {
  try {
    const projects = await prisma.project.findMany({
      include: { tasks: true },
    });
    return projects;
  } catch (error) {
    // THIS WILL REVEAL THE HIDDEN ERROR
    console.error(
      "CRITICAL DATABASE ERROR:",
      JSON.stringify(error, Object.getOwnPropertyNames(error), 2),
    );
    return [];
  }
}

// 2. Function to update an existing project's title
export async function updateProject(id: string, newTitle: string) {
  try {
    // Updates a specific project record found by its ID
    await prisma.project.update({
      where: { id: id }, // Finds the project using the unique ID
      data: { title: newTitle }, // Sets the new title provided by the user
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
    // 1. Construct the raw data object
    const data = {
      title,
      description,
      userId: undefined, // Explicitly undefined
    };

    // 2. Use 'as unknown' to bridge the type gap
    // This tells Prisma to treat the object as a raw set of database columns
    // and stop trying to validate the 'user' relation object.
    await prisma.project.create({
      data: data as unknown as Prisma.ProjectUncheckedCreateInput,
    });

    revalidatePath("/");
    return { success: true };
  } catch (error) {
    // Use the debug log to see the actual error output in your terminal
    console.error(
      "FULL DATABASE ERROR:",
      JSON.stringify(error, Object.getOwnPropertyNames(error), 2),
    );
    return { error: "Failed to create project" };
  }
}
