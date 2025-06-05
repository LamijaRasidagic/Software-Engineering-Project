package com.eatmovesleep.model;
import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "sleep_logs")
public class Sleep {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "user_id")
    private User user;

    @Column(name = "sleep_start", nullable = false)
    private LocalDateTime sleepStart;

    @Column(name = "sleep_end", nullable = false)
    private LocalDateTime sleepEnd;

    @Enumerated(EnumType.STRING)
    private SleepQuality quality;

    @Column(name = "hours", nullable = false)
    private  int hours = this.getSleepStart().getHour() + this.getSleepEnd().getHour();


    public enum SleepQuality {
        poor, average, good, excellent
    }


    public int getHours() {
        return hours;
    }

    public void setHours(int hours) {
        this.hours = hours;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public void setSleepStart(LocalDateTime sleepStart) {
        this.sleepStart = sleepStart;
    }

    public void setSleepEnd(LocalDateTime sleepEnd) {
        this.sleepEnd = sleepEnd;
    }

    public void setQuality(SleepQuality quality) {
        this.quality = quality;
    }

    public Long getId() {
        return id;
    }

    public User getUser() {
        return user;
    }

    public LocalDateTime getSleepStart() {
        return sleepStart;
    }

    public LocalDateTime getSleepEnd() {
        return sleepEnd;
    }

    public SleepQuality getQuality() {
        return quality;
    }


}
