import { createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit";
import { generatePeople } from "../utils/data";
import { Person } from "../types/Person";

export type Team = {
  id: string;
  members: Person[];
};

export type TeamsState = {
  pool: Person[];
  teams: Team[];
};

const initialState: TeamsState = {
  pool: generatePeople(),
  teams: [
    { id: "team-1", members: [] },
    { id: "team-2", members: [] },
    { id: "team-3", members: [] },
    { id: "team-4", members: [] },
  ],
};

const teamsSlice = createSlice({
  name: "teams",
  initialState,
  reducers: {
    movePerson: (
      state,
      action: PayloadAction<{
        source: { droppableId: string; index: number };
        destination: { droppableId: string; index: number };
      }>
    ) => {
      const { source, destination } = action.payload;

      // Get source array
      const sourceArray =
        source.droppableId === "pool"
          ? state.pool
          : state.teams.find((team) => team.id === source.droppableId)?.members;

      // Get destination array
      const destinationArray =
        destination.droppableId === "pool"
          ? state.pool
          : state.teams.find((team) => team.id === destination.droppableId)?.members;

      // Guard against missing arrays
      if (!sourceArray || !destinationArray) return;

      // Remove from source and insert into destination
      const [movedPerson] = sourceArray.splice(source.index, 1);
      destinationArray.splice(destination.index, 0, movedPerson);
    },
  },
});

// Selector for average age per team
export const selectTeamAverages = createSelector(
  (state: { teams: TeamsState }) => state.teams.teams,
  (teams) =>
    teams.map((team) => ({
      id: team.id,
      average:
        team.members.length > 0
          ? parseFloat(
              (
                team.members.reduce((sum, person) => sum + person.age, 0) /
                team.members.length
              ).toFixed(2)
            )
          : 0,
    }))
);

export const { movePerson } = teamsSlice.actions;
export default teamsSlice.reducer;
