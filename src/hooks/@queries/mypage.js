import { useMemo } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getProfile, createProfile, updateProfile, getTimeRecordList, getMyRoom, deleteStudyRoom } from "@api/mypage";
import { updateStudyRoom } from "@api/study-room";
import { useToast } from "@hooks/useToast";
import { COLORS } from "@utils/constants/time_record_colors";
import { SUCCESS_MESSAGES, ERROR_MESSAGES } from "@utils/constants/messages";

export const useMyGoalQuery = () => {
  const { data: myGoalData } = useQuery({
    queryKey: ["myGoal"],
    queryFn: getProfile,
  });

  return {
    myGoalData: myGoalData ?? {},
  };
};

export const useMyGoalMutation = () => {
  const queryClient = useQueryClient();
  const { myGoalData } = useMyGoalQuery();
  const { displayToast } = useToast();

  const createMyGoalMutation = useMutation({
    mutationFn: createProfile,
    onSuccess: (newMyGoalData) => {
      queryClient.setQueryData(["myGoal"], newMyGoalData);
      displayToast({ message: SUCCESS_MESSAGES.MY_GOAL_EDIT });
    },
    onError: () => {
      displayToast({ message: ERROR_MESSAGES.COMMON });
    },
  });

  const updateMyGoalMutation = useMutation({
    mutationFn: updateProfile,
    onSuccess: (newMyGoalData) => {
      queryClient.setQueryData(["myGoal"], newMyGoalData);
      displayToast({ message: SUCCESS_MESSAGES.MY_GOAL_EDIT });
    },
    onError: () => {
      displayToast({ message: ERROR_MESSAGES.COMMON });
    },
  });

  return !myGoalData ? createMyGoalMutation : updateMyGoalMutation;
};

export const useTimeRecordQuery = (date) => {
  const { data: timeRecordData } = useQuery({
    queryKey: ["timeRecordList", date],
    queryFn: () => getTimeRecordList(date),
  });

  const [timeRecordList, totalStudyTime] = useMemo(() => {
    let total = 0;
    return [
      timeRecordData?.map((e, i) => {
        const diff = new Date(e.endTime) - new Date(e.startTime);
        total += diff;
        return {
          startTime: new Date(e.startTime),
          endTime: new Date(e.endTime),
          subject: e.subject,
          color: COLORS[i % COLORS.length],
          studyTime: new Date(diff).toISOString().slice(11, 19),
        };
      }),
      total,
    ];
  }, [timeRecordData]);

  return {
    timeRecordList,
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
  const { displayToast } = useToast();

  return useMutation({
    mutationFn: ({ roomId, newRoomInfo }) => updateStudyRoom(roomId, newRoomInfo),
    onSuccess: () => {
      queryClient.invalidateQueries(["myRoom"]);
      displayToast({ message: SUCCESS_MESSAGES.STUDYROOM_EDIT });
    },
    onError: () => {
      displayToast({ message: ERROR_MESSAGES.COMMON });
    },
  });
};

export const useDeleteMyRoom = () => {
  const queryClient = useQueryClient();
  const { displayToast } = useToast();

  return useMutation({
    mutationFn: (roomId) => deleteStudyRoom(roomId),
    onSuccess: () => {
      queryClient.setQueryData(["myRoom"], null);
      displayToast({ message: SUCCESS_MESSAGES.STUDYROOM_DELETE });
    },
    onError: () => {
      displayToast({ message: ERROR_MESSAGES.COMMON });
    },
  });
};
