import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSetRecoilState } from "recoil";
import { errorState } from "@recoil/error-state";
import {
  getProfile,
  createProfile,
  updateProfile,
  getTimeRecordList,
  getMyRoom,
  deleteStudyRoom,
} from "@api/mypage-api";
import { updateStudyRoom } from "@api/study-room-api";
import { COLORS } from "@utils/constants/time_record_colors";

export const useMyGoalQuery = () => {
  const { data: myGoalData } = useQuery({
    queryKey: ["myGoal"],
    queryFn: getProfile,
  });

  return {
    myGoalData,
  };
};

export const useMyGoalMutation = () => {
  const queryClient = useQueryClient();
  const { myGoalData } = useMyGoalQuery();
  const setError = useSetRecoilState(errorState);

  const createMyGoalMutation = useMutation({
    mutationFn: createProfile,
    onSuccess: (newMyGoalData) => {
      queryClient.setQueryData(["myGoal"], newMyGoalData);
    },
    onError: (error) => {
      setError(error);
    },
  });

  const updateMyGoalMutation = useMutation({
    mutationFn: updateProfile,
    onSuccess: (newMyGoalData) => {
      queryClient.setQueryData(["myGoal"], newMyGoalData);
    },
    onError: (error) => {
      setError(error);
    },
  });

  return !myGoalData ? createMyGoalMutation : updateMyGoalMutation;
};

export const useTimeRecordQuery = (date) => {
  const { data: timeRecordData } = useQuery({
    queryKey: ["timeRecordList", date],
    queryFn: () => getTimeRecordList(date),
    select: (data) => {
      let totalStudyTime = 0;

      const timeRecordList = data.map((e, i) => {
        const startTime = new Date(e.startTime);
        const endTime = new Date(e.endTime);
        const diff = endTime - startTime;
        totalStudyTime += diff;

        return {
          startTime,
          endTime,
          color: COLORS[i % COLORS.length],
          studyTime: new Date(diff).toISOString().slice(11, 19),
        };
      });

      return {
        timeRecordList,
        totalStudyTime,
      };
    },
  });

  const { timeRecordList, totalStudyTime } = timeRecordData ?? {};

  return {
    timeRecordList: timeRecordList ?? [],
    totalStudyTime: totalStudyTime ?? 0,
  };
};

export const useMyRoomQuery = () => {
  const { data: myRoomData } = useQuery({
    queryKey: ["myRoom"],
    queryFn: getMyRoom,
  });

  return {
    myRoomData,
  };
};

export const useUpdateMyRoom = () => {
  const queryClient = useQueryClient();
  const setError = useSetRecoilState(errorState);

  return useMutation({
    mutationFn: ({ roomId, newRoomInfo }) => updateStudyRoom(roomId, newRoomInfo),
    onSuccess: (newRoomInfo) => {
      queryClient.setQueryData(["myRoom"], newRoomInfo);
    },
    onError: (error) => {
      setError(error);
    },
  });
};

export const useDeleteMyRoom = () => {
  const queryClient = useQueryClient();
  const setError = useSetRecoilState(errorState);

  return useMutation({
    mutationFn: (roomId) => deleteStudyRoom(roomId),
    onSuccess: () => {
      queryClient.setQueryData(["myRoom"], null);
    },
    onError: (error) => {
      setError(error);
    },
  });
};
