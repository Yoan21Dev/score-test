import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Score, Team } from '../types/types';



export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000' }), 
  endpoints: (builder) => ({
    getTeams: builder.query<{ data: Team[]; meta: any }, void>({
      query: () => '/score-team', 
    }),
    updateScoreTeam: builder.mutation({
      query: ({ id, teamId, userId, points }) => ({
        url: `/score-team/${id}`,
        method: 'PATCH',
        body: { teamId, userId, points },
      }),
    }),

  }),
});

export const { useGetTeamsQuery, useUpdateScoreTeamMutation } = api;