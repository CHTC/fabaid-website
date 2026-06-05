import ExportedImage from 'next-image-export-optimizer';
import { Box, Typography, Paper } from '@mui/material';
import React from 'react';
import { Staff } from '@/utils/staff';

const FABRIC_TEXTURES = [
  '/design/fabric/Fabric-08.png',
  '/design/fabric/Fabric-09.png',
  '/design/fabric/Fabric-20.png',
  '/design/fabric/Fabric-22.png',
  '/design/fabric/Fabric-23.png',
  '/design/fabric/Fabric-25.png',
];

function getFabricTexture(seed: string) {
  const hash = seed.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return FABRIC_TEXTURES[hash % FABRIC_TEXTURES.length];
}

type LeaderCardProps = Staff & {
  textAlign?: 'left' | 'right';
  imageSide?: 'left' | 'right';
};

export function LeaderCard({
  name,
  title,
  image,
  institution,
  textAlign = 'left',
  imageSide = 'left',
}: LeaderCardProps) {
  const fabricTexture = getFabricTexture(name);
  const isRightAligned = textAlign === 'right';
  const isImageOnRight = imageSide === 'right';

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', sm: isImageOnRight ? '1fr 220px' : '220px 1fr' },
        gap: 2,
        alignItems: 'center',
        mb: 2,
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: { xs: 300, sm: 220 },
          mx: { xs: 'auto', sm: 0 },
          order: { xs: 1, sm: isImageOnRight ? 2 : 1 },
        }}
      >
        <Box
          sx={{
            borderRadius: '1.2rem',
            p: 1.5,
            backgroundImage: `url(${fabricTexture})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}>
          <Paper
            sx={{
              p: 1,
              borderRadius: '1rem',
              bgcolor: 'background.paper',
            }}
          >
            <Box sx={{ position: 'relative', aspectRatio: 1 }}>
              <ExportedImage
                src={image}
                alt={name}
                fill={true}
                style={{
                  borderRadius: '1rem',
                  objectFit: 'cover',
                  display: 'block',
                }}
              />
            </Box>
          </Paper>
        </Box>
      </Box>
      <Box
        sx={{
          pl: { xs: 0, sm: isImageOnRight ? 0 : 1 },
          pr: { xs: 0, sm: isImageOnRight ? 1 : 0 },
          display: 'flex',
          flexDirection: 'column',
          order: { xs: 2, sm: isImageOnRight ? 1 : 2 },
        }}
      >
        <Box
          sx={{
            my: 'auto',
            ml: { xs: 0, sm: isRightAligned ? 'auto' : 0 },
            mr: { xs: 'auto', sm: isRightAligned ? 0 : 'auto' },
            textAlign: { xs: 'left', sm: textAlign },
          }}
        >
          <Typography variant={'h5'} color={'primary.dark'}>
            {name}
          </Typography>
          <Typography variant={'body1'} color={'text.secondary'}>
            {title}
          </Typography>
          <Typography variant={'body1'} color={'text.secondary'}>
            {institution}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export function StaffCard({ name, title, image, institution }: Staff) {
  const fabricTexture = getFabricTexture(name);

  return (
    <Box
      sx={{
        borderRadius: '1rem',
        padding: '1rem',
        bgcolor: 'background.paper',
        height: '100%',
        display: 'flex',
        flexDirection: 'row',
      }}
    >
      <Box
        sx={{
          p: '6px',
          backgroundImage: `url(${fabricTexture})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderRadius: '1rem',
        }}>
        <Paper
          sx={{
            p: 1,
            borderRadius: '0.8rem',
            bgcolor: 'background.paper',
          }}
        >
          <ExportedImage
            src={image}
            alt={name}
            height={150}
            width={150}
            style={{
              borderRadius: '0.8rem',
              objectFit: 'cover',
              display: 'block'
            }}
          />
        </Paper>
      </Box>

      <Box sx={{ pl: 1, display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ my: 'auto', ml: 0, mr: 'auto', textAlign: 'left' }}>
          <Typography variant={'h5'} color={'primary.dark'}>
            {name}
          </Typography>
          <Typography variant={'subtitle1'} color={'text.secondary'}>
            {title}
          </Typography>
          <Typography variant={'subtitle1'} lineHeight={1.4} color={'text.secondary'}>
            {institution}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
