import { Box, Stepper, Step, StepLabel, useTheme, useMediaQuery } from '@mui/material';
import { useRouter } from 'next/router';

const steps = [
  { label: 'Shipping', path: '/checkout/shipping' },
  { label: 'Payment', path: '/checkout/payment' },
  { label: 'Review', path: '/checkout/review' },
];

export const CheckoutStepper = () => {
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const currentStep = steps.findIndex(step => step.path === router.pathname);

  return (
    <Box sx={{ width: '100%', mb: 4 }}>
      <Stepper 
        activeStep={currentStep} 
        alternativeLabel={!isMobile}
        orientation={isMobile ? 'vertical' : 'horizontal'}
      >
        {steps.map((step, index) => (
          <Step 
            key={step.label}
            completed={currentStep > index}
          >
            <StepLabel
              sx={{
                cursor: currentStep >= index ? 'pointer' : 'default',
                '& .MuiStepLabel-label': {
                  color: currentStep >= index ? 'primary.main' : 'text.disabled',
                },
              }}
              onClick={() => {
                if (currentStep >= index) {
                  router.push(step.path);
                }
              }}
            >
              {step.label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}; 