// pages/index.tsx
import Image from "next/image";

const images = ["/images/GovEntry.png"];

export default function ProjectScreen() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-4xl font-bold mb-8">Projects I Have Worked On</h1>
      <p className="text-lg text-gray-600 w-2/3">
        Here are some of the projects I have worked on in the past. Each project
        represents a unique challenge and experience.
      </p>

      {/* Project Slider */}
      <div className="relative flex overflow-x-scroll scrollbar-thumb-gray-700 scrollbar-track-transparent scrollbar-thumb-rounded-full transition-transform duration-500 ease-in-out">
        {images.map((image, index) => (
          <div key={index} className={`w-screen h-[300px] relative`}>
            <Image
              src={image}
              width={500}
              height={500}
              alt={`Project ${index + 1}`}
              //   fill
              className="object-cover"
            />
          </div>
        ))}
      </div>

      {/* Project Descriptions */}
      {images.map((_, index) => (
        <div key={index} className="mt-4">
          <h2 className="text-xl font-semibold">Project {index + 1}</h2>
          <p className="text-lg text-gray-600">
            Description of the project. This is where you can add more details
            about what you worked on and achieved.
          </p>
        </div>
      ))}
    </div>
  );
}
