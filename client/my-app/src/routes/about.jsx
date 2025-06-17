import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/about')({
  component: About,
})

function About() {
  return <div className="p-2">This is a kanban board made using React, Tanstackrouter, Strapi, Render & Netlify by Serdar Karaman. Contact me via serdar.karaman@student.arteveldehs.be or my LinkedIn:  </div>
}