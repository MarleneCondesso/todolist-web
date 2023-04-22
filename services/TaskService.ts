import useTaskList from "@/hooks/useTask";
import axios from "axios";

export interface Task {
    id?: string;
    text: string;
    state: boolean;
    createdAt?: string;
    updateAt?: string;


}
export interface TaskDTO {
    text: string;
    state: boolean;
}
export interface TaskResponseDTO {
    response: boolean;
    message: string;
}

export class TaskService {




    postNewTask(request: TaskDTO): Promise<TaskResponseDTO> {

        return axios.post(
            '/api/task',
            {
                request
            }
        ).then(response => {
            return response.data;
        })

    }

    // response = await axios.delete('/api/favorite', { data: { movieId } });


}