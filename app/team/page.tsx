import { Box, Container, Grid, Typography, Divider } from '@mui/material';
import { LeaderCard, StaffCard } from "./_components"
import React from 'react';
import { getStaff } from '@/utils/staff';
import PageHeader from '@/components/PageHeader';

export default async function Page() {
  const team = await getStaff('fabaid');

  const promoted = team
    .filter(
      (member) =>
        member?.promoted == true &&
        member.organizations.includes('fabaid') &&
        member.status !== 'Past'
    )
    .sort((a, b) => (a.fabaid?.weight || 0) - (b.fabaid?.weight || 0));
  const staff = team
    .filter(
      (member) =>
        member.organizations.includes('fabaid') && member.status !== 'Past'
    )
    .sort((a, b) => (a.fabaid?.weight || 0) - (b.fabaid?.weight || 0));
  const pastStaff = team.filter(
    (member) =>
      member.organizations.includes('fabaid') && member.status === 'Past'
  );

  return (
    <Box pt={6}>
      <Container maxWidth={'lg'}>
        <PageHeader title='Team' texture='/design/fabric/Fabric-22.png' />
        <Grid container justifyContent={'center'} gap={2}>
          {staff.sort((a,b) => (a?.weight || 0) - (b?.weight || 0)).map((member, index) => {
            return (
              <Grid
                key={member.name}
                size={{
                  xs: 12,
                  sm: 6,
                  lg: 5
                }}>
                <LeaderCard
                  {...member}
                  textAlign={index % 2 === 0 ? 'left' : 'right'}
                  imageSide={index % 2 === 0 ? 'right' : 'left'}
                />
              </Grid>
            );
          })}
          {staff.length % 2 === 1 && (
            <Grid
              aria-hidden={true}
              size={{
                xs: 12,
                sm: 6,
                lg: 5,
              }}
              sx={{ display: { xs: 'none', sm: 'block' }, visibility: 'hidden' }}
            />
          )}
        </Grid>
        {pastStaff.length > 0 && (
          <>
            <Box pt={6} pb={4}>
              <Divider
                sx={{
                  bgcolor: 'primary.main',
                  height: '0.3rem',
                  width: '3rem',
                }}
              />
              <Typography variant='h4' component='h2'>
                Previous Staff
              </Typography>
            </Box>
            <Grid container justifyContent={'center'}>
              {pastStaff.map((member) => (
                <StaffCard key={member.name} {...member} />
              ))}
            </Grid>
          </>
        )}
      </Container>
    </Box>
  );
}
