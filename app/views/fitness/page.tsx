"use client";

import { DashboardShell } from "@/src/containers/dashboard/Dashboard";
import { BarChart, PieChart } from "@mantine/charts";
import {
  Divider,
  Grid,
  Input,
  Paper,
  Select,
  Stack,
  Text,
} from "@mantine/core";
import classes from "./Fitness.module.css";
import {
  IconCalendarMonth,
  IconPercentage,
  IconUpload,
} from "@tabler/icons-react";
import MyButton from "@/src/components/myComponents/MyButton";

const rawData = [
  {
    month: "January",
    bodyFat: 25,
    muscleMass: 30,
    boneMass: 13,
    skinMass: 8,
    residualMass: 24,
  },
  {
    month: "February",
    bodyFat: 24.8,
    muscleMass: 30.5,
    boneMass: 13,
    skinMass: 8,
    residualMass: 23.7,
  },
  {
    month: "March",
    bodyFat: 24.5,
    muscleMass: 31,
    boneMass: 13,
    skinMass: 8,
    residualMass: 23.5,
  },
  {
    month: "April",
    bodyFat: 24.2,
    muscleMass: 31.5,
    boneMass: 13,
    skinMass: 8,
    residualMass: 23.3,
  },
  {
    month: "May",
    bodyFat: 24,
    muscleMass: 32,
    boneMass: 13,
    skinMass: 8,
    residualMass: 23,
  },
  {
    month: "June",
    bodyFat: 23.8,
    muscleMass: 32.2,
    boneMass: 13,
    skinMass: 8,
    residualMass: 23,
  },
  {
    month: "July",
    bodyFat: 25.5,
    muscleMass: 30.5,
    boneMass: 13,
    skinMass: 8,
    residualMass: 23,
  },
];

export const data2 = [
  { name: "USA", value: 400, color: "blue.6" },
  { name: "India", value: 300, color: "yellow.6" },
  { name: "Japan", value: 300, color: "teal.6" },
  { name: "Other", value: 200, color: "gray.6" },
];

const normalizeData = (data: typeof rawData) =>
  data.map((entry) => {
    const { bodyFat, muscleMass, boneMass, skinMass, residualMass, ...rest } =
      entry;

    const total = bodyFat + muscleMass + boneMass + skinMass + residualMass;

    return {
      ...rest,
      bodyFat: (bodyFat / total) * 100,
      muscleMass: (muscleMass / total) * 100,
      boneMass: (boneMass / total) * 100,
      skinMass: (skinMass / total) * 100,
      residualMass: (residualMass / total) * 100,
    };
  });

const data = normalizeData(rawData);

const FitnessView = () => {
  return (
    <DashboardShell title={"Fitness"}>
      <Grid>
        <Grid.Col span={{ base: 12, md: 12 }}>
          <Paper className={classes.paper} shadow="lg">
            <Stack>
              <Text size="lg">Body composition %</Text>
              <BarChart
                h={300}
                data={data}
                dataKey="month"
                series={[
                  { name: "bodyFat", color: "orange.4" },
                  { name: "muscleMass", color: "red.6" },
                  { name: "boneMass", color: "white" },
                  { name: "skinMass", color: "yellow.3" },
                  { name: "residualMass", color: "teal.6" },
                ]}
                tickLine="y"
                gridAxis="x"
              />
              <Divider />
              <Text size="sm" c="dimmed">
                Current month: July Body fat: ${} + d.muscleMass + d.boneMass +
                d.skinMass + d.residualMass;
              </Text>
            </Stack>
          </Paper>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6 }}>
          <Paper className={classes.paper} shadow="lg">
            <PieChart
              withLabelsLine
              labelsPosition="outside"
              labelsType="percent"
              withLabels
              data={data2}
            />
          </Paper>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 3 }}>
          <Paper className={classes.paper} shadow="lg">
            <Stack>
              <Text>Update new month values</Text>
              <Select
                placeholder="Current month"
                variant="filled"
                data={[
                  "January",
                  "February",
                  "March",
                  "April",
                  "May",
                  "June",
                  "July",
                  "August",
                  "September",
                  "October",
                  "November",
                  "December",
                ]}
                rightSection={<IconCalendarMonth />}
              />
              <Grid>
                <Grid.Col span={{ base: 12, md: 6 }}>
                  <Input
                    variant="filled"
                    placeholder="Fat"
                    rightSection={<IconPercentage />}
                  />
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 6 }}>
                  <Input
                    variant="filled"
                    placeholder="Muscle"
                    rightSection={<IconPercentage />}
                  />
                </Grid.Col>
              </Grid>
              <Grid>
                <Grid.Col span={{ base: 12, md: 6 }}>
                  <Input
                    variant="filled"
                    placeholder="Bone"
                    rightSection={<IconPercentage />}
                  />
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 6 }}>
                  {" "}
                  <Input
                    variant="filled"
                    placeholder="Skin"
                    rightSection={<IconPercentage />}
                  />
                </Grid.Col>
              </Grid>
              <MyButton justify="space-between" rightSection={<IconUpload />}>
                Upload
              </MyButton>
            </Stack>
          </Paper>
        </Grid.Col>
      </Grid>
    </DashboardShell>
  );
};

export default FitnessView;
