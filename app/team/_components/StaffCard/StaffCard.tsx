import LeaderCard from "@/app/team/_components/LeaderCard/LeaderCard";
import getFabricTexture from "@/utils/getFabricTexture";
import { Staff } from '@/utils/staff';
import ExportedImage from 'next-image-export-optimizer';
import { Box, Typography, Paper } from '@mui/material';

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

export default StaffCard;
