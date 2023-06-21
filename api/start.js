import { EC2Client, StartInstancesCommand } from "@aws-sdk/client-ec2";

const client = new EC2Client({{ region: process.env.region }});

export async function startHandler(event) {

  const input = {
    InstanceIds: ["STRING_VALUE"]
  };

  const command = new StartInstancesCommand(input);
  const response = await client.send(command);

  return { message: "API Works" };
}
