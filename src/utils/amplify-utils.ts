import { createServerRunner } from '@aws-amplify/adapter-nextjs';
import outputs from '@root/amplify_outputs.json';
import { cookies } from 'next/headers';
import { getCurrentUser } from 'aws-amplify/auth/server';

export const { runWithAmplifyServerContext } = createServerRunner({
  config: outputs
});

export const isAuthenticated = async () =>
  await runWithAmplifyServerContext({
    nextServerContext: { cookies },
    async operation(contextSpec) {
      try {
        const user = await getCurrentUser(contextSpec);
        return !!user;
      } catch (error) {
        return false;
      }
    }
  });