import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";
import { movePerson, selectTeamAverages } from "./store/teamsSlice";
import type { RootState } from "./store/store";
import { TeamContainer, PersonItem, AverageDisplay } from "./styles";

const App = () => {
  const dispatch = useDispatch();
  const teams = useSelector((state: RootState) => state.teams);
  const averages = useSelector(selectTeamAverages);

  const onDragEnd = (result: any) => {
    const { source, destination } = result;
    if (!destination) return;
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;
    dispatch(movePerson({ source, destination }));
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 0.05fr)", gap: "0.05rem" }}>
        {/* People Pool */}
        <Droppable droppableId="pool" isDropDisabled={false}>
          {(provided) => (
            <TeamContainer ref={provided.innerRef} {...provided.droppableProps}>
              <h2>Available People</h2>
              {teams.pool.filter(person => person?.id !== undefined && person?.id !== null).map((person, index) => (
                <Draggable
                  key={person.id.toString()}
                  draggableId={person.id.toString()}
                  index={index}
                >
                      {(provided) => (
                        <PersonItem
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          {person.name} ({person.age})
                        </PersonItem>
                      )}
                </Draggable>
              ))}
              {provided.placeholder}
            </TeamContainer>
          )}
        </Droppable>
        {/* Teams */}
        {teams.teams.map((team, teamIndex) => (
          <Droppable key={team.id} droppableId={team.id.toString()}>
              {(provided) => (
                <TeamContainer ref={provided.innerRef} {...provided.droppableProps}>
                  <h2>Team {teamIndex + 1}</h2>
                  {team.members.filter(person => person?.id !== undefined && person?.id !== null).map((person, index) => (
                      <Draggable
                        key={person.id.toString()}
                        draggableId={person.id.toString()}
                        index={index}
                        >
                            {(provided) => (
                              <PersonItem
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                              >
                                {person.name} ({person.age})
                              </PersonItem>
                            )}
                      </Draggable>
                    ))}
                  {provided.placeholder}
                  <AverageDisplay>
                    Average Age: {averages.find((a) => a.id === team.id)?.average || 0}
                  </AverageDisplay>
                </TeamContainer>
              )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
};

export default App;
