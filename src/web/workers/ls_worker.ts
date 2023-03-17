/* istanbul ignore file */

import * as dotenv from "dotenv";

import { Message, WorkProcessor } from "@/web/workers/requests";
import { Workers } from "@/web/workers/worker_types";
import { startRemoteWorker } from "@/web/sockets/socket_workers";
import { LewisAndShort } from "@/web/dicts/ls";

class LsWorker implements WorkProcessor<string, string> {
  readonly category = Workers.LS_DICT;
  private lewisAndShort?: LewisAndShort = undefined;

  async setup(): Promise<void> {
    this.lewisAndShort = LewisAndShort.create(process.env.LS_PATH);
  }

  process(input: Message<string>): Promise<string> {
    return this.lewisAndShort!.getEntry(input.content);
  }

  teardown(): void {}
}

dotenv.config();
startRemoteWorker(new LsWorker());
