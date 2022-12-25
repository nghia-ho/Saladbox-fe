import { Button, Card, Step, StepLabel, Stepper } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

function StepperOrder({ order, activeStep, steps }) {
  return (
    <>
      {order?.custom && (
        <Card
          sx={{
            display: { xs: "none", md: "inline" },
            width: 1,
            my: 1,
          }}
        >
          <Box sx={{ p: 3 }}>
            <Stepper activeStep={activeStep}>
              {steps.map((label, index) => {
                const stepProps = {};
                const labelProps = {};

                return (
                  <Step key={label} {...stepProps}>
                    <StepLabel {...labelProps}>{label}</StepLabel>
                  </Step>
                );
              })}
            </Stepper>

            {activeStep === steps.length && (
              <React.Fragment>
                <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                  <Box sx={{ flex: "1 1 auto" }} />
                  <Button disabled>Completed</Button>
                </Box>
              </React.Fragment>
            )}
          </Box>
        </Card>
      )}
      {order?.custom && (
        <Card sx={{ display: { xs: "inline", md: "none" }, width: 1, my: 1 }}>
          <Box sx={{ p: 3 }}>
            <Stepper activeStep={activeStep} orientation="vertical">
              {steps.map((label, index) => {
                const stepProps = {};
                const labelProps = {};

                return (
                  <Step key={label} {...stepProps}>
                    <StepLabel {...labelProps}>{label}</StepLabel>
                  </Step>
                );
              })}
            </Stepper>

            {activeStep === steps.length && (
              <React.Fragment>
                <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                  <Box sx={{ flex: "1 1 auto" }} />
                  <Button disabled>Completed</Button>
                </Box>
              </React.Fragment>
            )}
          </Box>
        </Card>
      )}
    </>
  );
}

export default StepperOrder;
