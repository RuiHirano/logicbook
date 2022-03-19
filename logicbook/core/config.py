from pydantic import BaseModel
import yaml
class Config(BaseModel):
    path: str
    
def get_config(config_path):
    with open(config_path, 'r') as yml:
        config_yaml = yaml.load(yml)
    return Config(**config_yaml)