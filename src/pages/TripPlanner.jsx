import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

// Sample activities
const initialActivities = [
  { id: "1", name: "Visit Eiffel Tower" },
  { id: "2", name: "Explore Tokyo Disneyland" },
  { id: "3", name: "Relax at Maldives Beach" },
  { id: "4", name: "Safari Adventure in Kenya" },
];

const TripPlanner = () => {
  const [activities, setActivities] = useState(initialActivities);
  const [days, setDays] = useState({
    day1: [],
    day2: [],
    day3: [],
  });

  const onDragEnd = (result) => {
    const { source, destination } = result;

    // If no destination, exit
    if (!destination) {
      console.log("Dropped outside droppable area");
      return;
    }

    console.log("Source Droppable ID:", source.droppableId);
    console.log("Destination Droppable ID:", destination.droppableId);

    // Dragging from activityList
    if (source.droppableId === "activityList") {
      const draggedActivity = activities[source.index];
      console.log("Dragged Activity:", draggedActivity);

      // Remove from activity list
      const updatedActivities = [...activities];
      updatedActivities.splice(source.index, 1);

      // Add to destination day
      const updatedDay = [...days[destination.droppableId]];
      updatedDay.splice(destination.index, 0, draggedActivity);

      console.log("Updated Activities:", updatedActivities);
      console.log("Updated Day after adding activity:", updatedDay);

      // Update states immutably
      setActivities(updatedActivities);
      setDays(prev => ({
        ...prev,
        [destination.droppableId]: updatedDay,
      }));
    } 
    // Dragging within or between days
    else {
      const sourceDay = [...days[source.droppableId]];
      const [draggedItem] = sourceDay.splice(source.index, 1);
      const destinationDay = [...days[destination.droppableId]];

      console.log("Dragged Item:", draggedItem);
      console.log("Source Day after removal:", sourceDay);
      console.log("Destination Day after addition:", destinationDay);

      // Update days state immutably
      setDays(prev => ({
        ...prev,
        [source.droppableId]: sourceDay,
        [destination.droppableId]: destinationDay,
      }));
    }
  };

  return (
    <div className="container mx-auto p-4 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Trip Planner</h1>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Activity List */}
          <div>
            <h2 className="text-xl font-semibold mb-2">Available Activities</h2>
            <Droppable droppableId="activityList">
              {(provided) => {
                console.log("Droppable Props for activityList:", provided);
                return (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="bg-white p-4 rounded shadow min-h-[300px]"
                  >
                    {activities.map((activity, index) => (
                      <Draggable
                        key={activity.id}
                        draggableId={activity.id}
                        index={index}
                      >
                        {(provided) => {
                          console.log("Draggable Props for activity:", activity);
                          return (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="p-2 mb-2 bg-teal-600 text-white rounded cursor-pointer"
                            >
                              {activity.name}
                            </div>
                          );
                        }}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                );
              }}
            </Droppable>
          </div>

          {/* Calendar (Days) */}
          {Object.keys(days).map((dayKey) => (
            <div key={dayKey}>
              <h2 className="text-xl font-semibold mb-2 capitalize">{dayKey}</h2>
              <Droppable droppableId={dayKey}>
                {(provided) => {
                  console.log("Droppable Props for day:", dayKey, provided);
                  return (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className="bg-white p-4 rounded shadow min-h-[300px]"
                    >
                      {days[dayKey].map((activity, index) => (
                        <Draggable
                          key={activity.id}
                          draggableId={activity.id}
                          index={index}
                        >
                          {(provided) => {
                            console.log("Draggable Props for activity in day:", activity);
                            return (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className="p-2 mb-2 bg-teal-600 text-white rounded cursor-pointer"
                              >
                                {activity.name}
                              </div>
                            );
                          }}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  );
                }}
              </Droppable>
            </div>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default TripPlanner;
