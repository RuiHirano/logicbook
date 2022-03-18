
import os
from pathlib import Path

class PipelineGenerator(object):
    def __init__(self):
        self.logdir = "test_logdir"

    def create_job_args(self, command, job_args_conf, args_param):
        # commandの引数argsのチェック、作成を行う
        args = []
        for job_arg in job_args_conf:
            arg_type = job_arg["type"]
            arg_name = job_arg["name"]
            if arg_name not in args_param:
                # jobに必要な引数がargsになければエラー
                print("error arg {} is not found".format(arg_name))
                raise "Error1"
            else:
                # argとdir_pathを決定
                arg = ""
                dir_path = ""
                if "data." in args_param[arg_name]:
                    data_arg_name = args_param[arg_name].replace('data.', '')
                    if data_arg_name not in command['data']:
                        print("error arg {} is not found in {}".format(data_arg_name, command['data']))
                        raise "Error2"
                    arg = command['data'][data_arg_name]
                    dir_path = ""
                else:
                    arg = args_param[arg_name]
                    dir_path = "{}/logs/{}".format("/path/to/", self.logdir)

                if "dir" in job_arg and job_arg["dir"] == "logs":
                    dir_path = "{}/logs/{}".format("/path/to/", self.logdir)

                # arg_type毎にargsを場合分け
                if arg_type == "files" and type(arg) == list:
                    for val in arg:
                        path = str(Path(dir_path).joinpath(val).resolve())
                        args.append(path)
                elif arg_type == "string":
                    args.append(arg)
                elif arg_type == "number":
                    args.append(str(arg))
                else:
                    print("invalid argument is found".format(arg_name))
                    raise "Error3"
        return args

if __name__ == "__main__":
    pg = PipelineGenerator()
    args = pg.create_job_args(
        command={
            "name": "test",
            "type": "test",
            "data": {
                "str1": "test2",
            }
        },
        job_args_conf=[
            {
                "name": "str1",
                "type": "string",
            }
        ],
        args_param={
            "str1": "data.str1"
        }
    )
    print(args)